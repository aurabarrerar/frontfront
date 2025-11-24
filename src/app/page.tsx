// En el nuevo archivo: C:\...\frontfront\src\app\page.tsx

// 🚨 CORRECCIÓN FINAL 🚨: Usa './' porque 'login' es una carpeta hermana.
import LoginPage from "./login/page";

export default function Home() {
  return <LoginPage />;
}
