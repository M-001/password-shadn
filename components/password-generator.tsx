'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from "@/hooks/use-toast"

export default function PasswordGenerator() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState([12])
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })
  const { toast } = useToast()

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'

    let chars = ''
    if (options.uppercase) chars += uppercase
    if (options.lowercase) chars += lowercase
    if (options.numbers) chars += numbers
    if (options.symbols) chars += symbols

    if (chars === '') {
      setPassword('请至少选择一个选项')
      return
    }

    let generatedPassword = ''
    for (let i = 0; i < length[0]; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length)
      generatedPassword += chars[randomIndex]
    }
    setPassword(generatedPassword)
  }

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password)
      toast({
        title: "已复制到剪贴板",
        description: "密码已成功复制到剪贴板",
      })
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>生成密码</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>密码长度: {length[0]}</span>
          </div>
          <Slider
            value={length}
            onValueChange={setLength}
            max={32}
            min={4}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="uppercase"
              checked={options.uppercase}
              onCheckedChange={(checked) =>
                setOptions({ ...options, uppercase: checked === true })
              }
            />
            <label htmlFor="uppercase">包含大写字母</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="lowercase"
              checked={options.lowercase}
              onCheckedChange={(checked) =>
                setOptions({ ...options, lowercase: checked === true })
              }
            />
            <label htmlFor="lowercase">包含小写字母</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="numbers"
              checked={options.numbers}
              onCheckedChange={(checked) =>
                setOptions({ ...options, numbers: checked === true })
              }
            />
            <label htmlFor="numbers">包含数字</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="symbols"
              checked={options.symbols}
              onCheckedChange={(checked) =>
                setOptions({ ...options, symbols: checked === true })
              }
            />
            <label htmlFor="symbols">包含特殊字符</label>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex space-x-2">
            <Input value={password} readOnly />
            <Button onClick={copyToClipboard}>
              复制
            </Button>
          </div>
          <Button onClick={generatePassword} className="w-full">
            生成密码
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 