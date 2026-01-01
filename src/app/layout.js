import './globals.css'

export const metadata = {
  title: 'Monopoly Bank',
  description: 'Banco do Jogador',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
