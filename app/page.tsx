import PasswordGenerator from '@/components/password-generator'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow flex flex-col items-center justify-center p-8 md:p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between">
          <h1 className="text-4xl font-bold text-center mb-8">密码生成器</h1>
          <PasswordGenerator />
        </div>
      </main>
      <footer className="py-6 border-t">
        <div className="container mx-auto text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} 密码生成器 | 使用 Next.js 和 Shadcn UI 构建</p>
        </div>
      </footer>
    </div>
  )
}
