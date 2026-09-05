"use client";

// Poslednja linija odbrane: root layout nije primenjen, pa ovaj fajl mora sam
// da renderuje <html> i <body>. Stilovi su inline jer CSS možda nije dostupan.
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="sr">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          padding: "1.5rem",
          textAlign: "center",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.5rem" }}>
            Aplikacija se neočekivano zaustavila
          </h1>
          <p style={{ color: "#666", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
            Osvežite stranicu. Ako se problem ponovi, pokušajte kasnije.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              cursor: "pointer",
              borderRadius: "0.5rem",
              border: "1px solid #ccc",
              background: "transparent",
              padding: "0.5rem 1rem",
              font: "inherit",
            }}
          >
            Pokušaj ponovo
          </button>
        </div>
      </body>
    </html>
  );
}
