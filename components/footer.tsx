"use client"

import { motion } from "framer-motion"
import { Sparkles, Mail, Phone, MapPin, Twitter, Linkedin, Github, Youtube } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface FooterProps {
  translations: {
    privacyPolicy: string
    termsOfService: string
    cookieSettings: string
    contactUs: string
    aboutUs: string
    careers: string
    blog: string
    support: string
    newsletter: string
    subscribeText: string
  }
}

export function Footer({ translations }: FooterProps) {
  const [cookieDialogOpen, setCookieDialogOpen] = useState(false)

  return (
    <footer className="relative mt-20 border-t border-border/50">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Factor K
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Empowering gifted minds with cutting-edge educational experiences designed for the next generation of innovators.
            </p>
            <div className="flex gap-3">
              <SocialButton icon={<Twitter className="w-4 h-4" />} label="Twitter" />
              <SocialButton icon={<Linkedin className="w-4 h-4" />} label="LinkedIn" />
              <SocialButton icon={<Github className="w-4 h-4" />} label="GitHub" />
              <SocialButton icon={<Youtube className="w-4 h-4" />} label="YouTube" />
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <FooterLink href="#about">{translations.aboutUs}</FooterLink>
              <FooterLink href="#careers">{translations.careers}</FooterLink>
              <FooterLink href="#blog">{translations.blog}</FooterLink>
              <FooterLink href="#support">{translations.support}</FooterLink>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                      {translations.privacyPolicy}
                    </button>
                  </DialogTrigger>
                  <DialogContent className="glass-card rounded-2xl max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{translations.privacyPolicy}</DialogTitle>
                    </DialogHeader>
                    <div className="prose prose-sm dark:prose-invert">
                      <p>Last updated: March 2026</p>
                      <h3>1. Information We Collect</h3>
                      <p>We collect information you provide directly to us, such as when you create an account, submit educational content, or contact us for support.</p>
                      <h3>2. How We Use Your Information</h3>
                      <p>We use the information we collect to provide, maintain, and improve our educational services, to communicate with you, and to personalize your learning experience.</p>
                      <h3>3. Data Security</h3>
                      <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                      <h3>4. Children&apos;s Privacy</h3>
                      <p>Our platform is designed for educational purposes. We comply with COPPA and take additional measures to protect the privacy of minors using our services.</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </li>
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                      {translations.termsOfService}
                    </button>
                  </DialogTrigger>
                  <DialogContent className="glass-card rounded-2xl max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{translations.termsOfService}</DialogTitle>
                    </DialogHeader>
                    <div className="prose prose-sm dark:prose-invert">
                      <p>Last updated: March 2026</p>
                      <h3>1. Acceptance of Terms</h3>
                      <p>By accessing or using Factor K, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                      <h3>2. User Accounts</h3>
                      <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
                      <h3>3. Educational Content</h3>
                      <p>All educational materials provided through our platform are for personal, non-commercial use only.</p>
                      <h3>4. Intellectual Property</h3>
                      <p>All content, features, and functionality are owned by Factor K and are protected by international copyright, trademark, and other intellectual property laws.</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </li>
              <li>
                <Dialog open={cookieDialogOpen} onOpenChange={setCookieDialogOpen}>
                  <DialogTrigger asChild>
                    <button className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                      {translations.cookieSettings}
                    </button>
                  </DialogTrigger>
                  <DialogContent className="glass-card rounded-2xl">
                    <DialogHeader>
                      <DialogTitle>{translations.cookieSettings}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        We use cookies to enhance your browsing experience. You can manage your preferences below.
                      </p>
                      <CookieOption
                        title="Essential Cookies"
                        description="Required for the website to function properly"
                        defaultChecked
                        disabled
                      />
                      <CookieOption
                        title="Analytics Cookies"
                        description="Help us understand how you use our platform"
                        defaultChecked
                      />
                      <CookieOption
                        title="Marketing Cookies"
                        description="Used to deliver relevant advertisements"
                      />
                      <div className="flex gap-3 pt-4">
                        <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setCookieDialogOpen(false)}>
                          Reject All
                        </Button>
                        <Button className="flex-1 rounded-xl gradient-bg text-white" onClick={() => setCookieDialogOpen(false)}>
                          Accept All
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-semibold mb-4">{translations.contactUs}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                hello@factork.edu
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5" />
                123 Innovation Drive<br />
                San Francisco, CA 94105
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-muted-foreground">
            &copy; 2026 Factor K. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">
              Built with care for extraordinary minds
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

function SocialButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="w-9 h-9 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      aria-label={label}
    >
      {icon}
    </motion.button>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a
        href={href}
        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
      >
        {children}
      </a>
    </li>
  )
}

function CookieOption({
  title,
  description,
  defaultChecked,
  disabled,
}: {
  title: string
  description: string
  defaultChecked?: boolean
  disabled?: boolean
}) {
  const [checked, setChecked] = useState(defaultChecked || false)

  return (
    <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-muted/30">
      <div>
        <p className="font-medium text-sm">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <button
        onClick={() => !disabled && setChecked(!checked)}
        disabled={disabled}
        className={`w-10 h-6 rounded-full transition-colors relative ${
          checked ? "gradient-bg" : "bg-muted"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  )
}
