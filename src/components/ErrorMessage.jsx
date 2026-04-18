export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div
      style={{
        background: "#ffe5e5",
        border: "1px solid #ff4d4d",
        color: "#b30000",
        padding: "12px 16px",
        borderRadius: "8px",
        marginBottom: "16px",
        fontWeight: "600",
      }}
    >
      ⚠️ {message}
    </div>
  );
}
