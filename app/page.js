import Link from "next/link";

export default function HomePage() {

  const container = {
    fontFamily: "system-ui, Arial, sans-serif",
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "2rem"
  };

  const hero = {
    textAlign: "center",
    padding: "4rem 1rem",
    borderBottom: "1px solid #eee"
  };

  const section = {
    marginTop: "3rem"
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
    marginTop: "1.5rem"
  };

  const card = {
    border: "1px solid #e5e5e5",
    borderRadius: "10px",
    padding: "1.2rem",
    background: "#fafafa"
  };

  const stepCard = {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "1.2rem",
    background: "#fff"
  };

  const button = {
    padding: "0.8rem 1.6rem",
    backgroundColor: "#0070f3",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: 500,
    display: "inline-block"
  };

  return (
    <div style={container}>

      {/* HERO */}
      <section style={hero}>
        <h1 style={{fontSize:"3rem", marginBottom:"0.5rem"}}>
          VitalPass
        </h1>

        <p style={{
          fontSize:"1.35rem",
          color:"#444",
          maxWidth:"650px",
          margin:"0 auto 2rem"
        }}>
          If you were unconscious during a medical emergency,
          would the people helping you know what could save your life?
        </p>

        <Link href="/dashboard" style={button}>
          Manage Family Profiles
        </Link>
      </section>


      {/* WHY VITALPASS */}
      <section style={section}>
        <h2 style={{fontSize:"1.8rem", marginBottom:"1rem"}}>
          Why VitalPass?
        </h2>

        <div style={card}>
          <p style={{lineHeight:"1.7", color:"#444"}}>
            During emergencies, patients may be unable to communicate critical
            medical information such as allergies, chronic conditions, or
            medications. VitalPass provides a secure medical identity system
            that allows responders or bystanders to instantly access life-saving
            information through a QR scan. The system also provides intelligent
            guidance, voice summaries, and emergency communication tools to
            support faster and safer decision making.
          </p>
        </div>
      </section>


      {/* FEATURES */}
      <section style={section}>
        <h2 style={{fontSize:"1.8rem", marginBottom:"1rem"}}>
          Core Features
        </h2>

        <div style={grid}>

          <div style={card}>
            <strong>Family Medical Profiles</strong>
            <p>
              Store emergency medical information for yourself and family
              members including allergies, conditions, medications and
              emergency contacts.
            </p>
          </div>

          <div style={card}>
            <strong>QR Emergency Access</strong>
            <p>
              Each profile generates a QR code that instantly opens the
              emergency medical page containing critical information.
            </p>
          </div>

          <div style={card}>
            <strong>Bystander Guidance Mode</strong>
            <p>
              The system translates medical data into clear emergency guidance
              to help bystanders understand what actions should or should not
              be taken.
            </p>
          </div>

          <div style={card}>
            <strong>AI-Assisted Medical Explanation</strong>
            <p>
              AI can analyze the patient’s medical information and explain
              important risks and precautions in simple language for responders.
            </p>
          </div>

          <div style={card}>
            <strong>Voice Medical Summary</strong>
            <p>
              A voice assistant can read the patient’s critical medical
              information aloud so responders can quickly understand the
              situation.
            </p>
          </div>

          <div style={card}>
            <strong>Emergency Contact Alerts</strong>
            <p>
              Emergency contacts can be notified when an emergency alert is
              triggered, including the time and location of the incident.
            </p>
          </div>

          <div style={card}>
            <strong>Scan Activity Logs</strong>
            <p>
              Profile owners can see when and where their emergency profile was
              accessed through QR scans.
            </p>
          </div>

          <div style={card}>
            <strong>Nearby Hospital Assistance</strong>
            <p>
              The emergency page can help locate nearby hospitals to guide
              bystanders toward faster medical support.
            </p>
          </div>

        </div>
      </section>


      {/* HOW IT WORKS */}
      <section style={section}>
        <h2 style={{fontSize:"1.8rem", marginBottom:"1rem"}}>
          How VitalPass Works
        </h2>

        <div style={grid}>

          <div style={stepCard}>
            <strong>Create Medical Profiles</strong>
            <p>
              Add medical information such as allergies, medications and
              emergency contacts.
            </p>
          </div>

          <div style={stepCard}>
            <strong>Generate QR Code</strong>
            <p>
              Each profile automatically generates a unique emergency QR code.
            </p>
          </div>

          <div style={stepCard}>
            <strong>Attach QR to Phone or ID</strong>
            <p>
              Place the QR code on a phone lock screen, medical card or
              wearable tag for quick access.
            </p>
          </div>

          <div style={stepCard}>
            <strong>Scan During Emergency</strong>
            <p>
              Bystanders or responders scan the QR code to open the emergency
              profile instantly.
            </p>
          </div>

          <div style={stepCard}>
            <strong>Guidance & Voice Support</strong>
            <p>
              The system highlights critical risks, provides guidance and can
              read medical information aloud.
            </p>
          </div>

        </div>
      </section>


      {/* CTA */}
      <section style={{
        marginTop:"4rem",
        textAlign:"center",
        paddingTop:"2rem",
        borderTop:"1px solid #eee"
      }}>
        <h2 style={{fontSize:"1.7rem", marginBottom:"1rem"}}>
          Prepare Before an Emergency Happens
        </h2>

        <p style={{color:"#555", marginBottom:"1.5rem"}}>
          Create emergency medical profiles and ensure that life-saving
          information is always accessible when every second matters.
        </p>

        
      </section>

    </div>
  );
}