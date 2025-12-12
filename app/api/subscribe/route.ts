import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, appName } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email requis' },
        { status: 400 }
      );
    }

    // Debug: vérifier les variables d'environnement
    const apiKey = process.env.BREVO_API_KEY;
    const listId = process.env.BREVO_LIST_ID;
    
    console.log('BREVO_API_KEY exists:', !!apiKey);
    console.log('BREVO_LIST_ID:', listId);

    if (!apiKey) {
      console.error('BREVO_API_KEY is undefined');
      return NextResponse.json(
        { error: 'Configuration serveur manquante' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        listIds: [parseInt(process.env.BREVO_LIST_ID || '2')],
        attributes: {
          APP_NAME: appName || 'Minia Maker',
          SIGNUP_DATE: new Date().toISOString(),
        },
        updateEnabled: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erreur Brevo:', errorData);
      
      // Si le contact existe déjà, c'est ok
      if (errorData.code === 'duplicate_parameter') {
        return NextResponse.json({ 
          success: true, 
          message: 'Email déjà enregistré' 
        });
      }
      
      return NextResponse.json(
        { error: 'Erreur lors de l\'inscription' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error('Erreur API subscribe:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
