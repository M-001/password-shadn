'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"

export default function PasswordGenerator() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState([12])
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })
  const [strength, setStrength] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const { toast } = useToast()

  // 计算密码强度
  useEffect(() => {
    if (!password || password === '请至少选择一个选项') {
      setStrength(0)
      return
    }
    
    let score = 0
    // 长度分数
    score += Math.min(length[0] / 8, 1) * 25
    
    // 多样性分数
    const hasUpper = /[A-Z]/.test(password)
    const hasLower = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSymbol = /[^A-Za-z0-9]/.test(password)
    
    score += (hasUpper ? 25 : 0)
    score += (hasLower ? 20 : 0)
    score += (hasNumber ? 15 : 0)
    score += (hasSymbol ? 15 : 0)
    
    setStrength(Math.min(Math.floor(score), 100))
  }, [password, length])

  const getStrengthColor = () => {
    if (strength < 30) return "bg-red-500"
    if (strength < 60) return "bg-orange-500"
    if (strength < 80) return "bg-yellow-500"
    return "bg-green-500"
  }
  
  const getStrengthText = () => {
    if (strength < 30) return "弱"
    if (strength < 60) return "中"
    if (strength < 80) return "强"
    return "非常强"
  }

  const generatePassword = async () => {
    setIsGenerating(true)
    
    // 模拟生成过程的延迟，增强用户体验
    await new Promise(resolve => setTimeout(resolve, 400))
    
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
      setIsGenerating(false)
      return
    }

    let generatedPassword = ''
    for (let i = 0; i < length[0]; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length)
      generatedPassword += chars[randomIndex]
    }
    setPassword(generatedPassword)
    setIsGenerating(false)
  }

  const copyToClipboard = async () => {
    if (password && password !== '请至少选择一个选项') {
      await navigator.clipboard.writeText(password)
      setIsCopied(true)
      
      toast({
        title: "已复制到剪贴板",
        description: "密码已成功复制到剪贴板",
      })
      
      // 恢复按钮状态
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">生成密码</CardTitle>
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
              className="my-4"
            />
          </div>

          <div className="space-y-2">
            <motion.div 
              className="grid grid-cols-2 gap-4"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="show"
            >
              <motion.div 
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0 }
                }}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  id="uppercase"
                  checked={options.uppercase}
                  onCheckedChange={(checked) =>
                    setOptions({ ...options, uppercase: checked === true })
                  }
                />
                <label htmlFor="uppercase">包含大写字母</label>
              </motion.div>
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0 }
                }}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  id="lowercase"
                  checked={options.lowercase}
                  onCheckedChange={(checked) =>
                    setOptions({ ...options, lowercase: checked === true })
                  }
                />
                <label htmlFor="lowercase">包含小写字母</label>
              </motion.div>
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0 }
                }}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  id="numbers"
                  checked={options.numbers}
                  onCheckedChange={(checked) =>
                    setOptions({ ...options, numbers: checked === true })
                  }
                />
                <label htmlFor="numbers">包含数字</label>
              </motion.div>
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0 }
                }}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  id="symbols"
                  checked={options.symbols}
                  onCheckedChange={(checked) =>
                    setOptions({ ...options, symbols: checked === true })
                  }
                />
                <label htmlFor="symbols">包含特殊字符</label>
              </motion.div>
            </motion.div>
          </div>

          {password && password !== '请至少选择一个选项' && (
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <label className="text-sm text-gray-500">密码强度</label>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full ${getStrengthColor()}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${strength}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="text-right text-sm">{getStrengthText()}</div>
            </motion.div>
          )}

          <div className="space-y-2">
            <AnimatePresence>
              <motion.div 
                className="relative overflow-hidden"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Input 
                  value={password} 
                  readOnly 
                  className="pr-12 font-mono text-base"
                />
                {isGenerating && (
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center bg-background/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
            
            <div className="flex space-x-2">
              <motion.div className="w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  onClick={generatePassword} 
                  className="w-full"
                  disabled={isGenerating}
                >
                  {isGenerating ? '生成中...' : '生成密码'}
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={copyToClipboard} 
                  variant={isCopied ? "outline" : "default"}
                  disabled={!password || password === '请至少选择一个选项' || isGenerating}
                  className="relative overflow-hidden"
                >
                  {isCopied ? (
                    <motion.span
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                    >
                      已复制
                    </motion.span>
                  ) : (
                    <motion.span
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                    >
                      复制
                    </motion.span>
                  )}
                  
                  {isCopied && (
                    <motion.div 
                      className="absolute inset-0 bg-green-500 opacity-20"
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 