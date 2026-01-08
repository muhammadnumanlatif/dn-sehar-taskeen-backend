'use client';

export default function GlobalError({ error, reset }) {
    return (
        <html>
            <body>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'system-ui, sans-serif' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Critical Error</h2>
                    <p>Something went critically wrong. Please verify your connection.</p>
                    <button
                        onClick={() => typeof reset === 'function' && reset()}
                        style={{
                            padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem'
                        }}
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}
