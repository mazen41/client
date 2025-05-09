import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "navbar": {
        "home": "Home",
        "about": "About",
        "services": "Services",
        "why": "Why Us",
        "login": "Login",
        "register": "Register"
      },
      "hero": {
        "title": "Smarter Payments with NadaPay",
        "subtitle": "Accept payments easily via secure gateways and payment links. Supports Mada, Visa, Mastercard, Apple Pay, and STC Pay.",
        "cta1": "Start Now",
        "cta2": "Contact Us"
      },
      "about": {
        "title": "About NadaPay",
        "content": "NadaPay is a modern electronic payment provider that enables businesses of all sizes to accept payments quickly and securely. Whether you run an online store or offer services, our platform helps you get paid through customized gateways and instant payment links."
      },
      "services": {
        "title": "Our Services",
        "items": [
          {
            "title": "Online Payment Gateways",
            "description": "Fully integrated and secure gateways for websites and mobile apps."
          },
          {
            "title": "Payment Links",
            "description": "Create and send payment links in seconds—no website needed."
          },
          {
            "title": "Multi-Card Support",
            "description": "Accept payments via Mada, Visa, Mastercard, Apple Pay, and STC Pay."
          },
          {
            "title": "Dashboard & Analytics",
            "description": "Monitor transactions and generate reports with ease."
          }
        ]
      },
      "why": {
        "title": "Why Choose NadaPay?",
        "items": [
          "Easy Integration",
          "Real-Time Transaction Tracking",
          "PCI-DSS Certified",
          "Transparent Pricing"
        ]
      },
      "login": {
        "title": "Sign in to NadaPay",
        "subtitle": "Enter your details to access your account",
        "email": "Email Address",
        "password": "Password",
        "forgotPassword": "Forgot password?",
        "signIn": "Sign In",
        "or": "OR",
        "noAccount": "Don't have an account?",
        "createAccount": "Create account"
      },
      "register": {
        "title": "Create Account",
        "subtitle": "Get started with NadaPay in minutes",
        "fullName": "Full Name",
        "email": "Email Address",
        "password": "Password",
        "company": "Company (Optional)",
        "createAccount": "Create Account",
        "or": "OR",
        "haveAccount": "Already have an account?",
        "signIn": "Sign in"
      },
      // Add this part for the footer
      "footer": {
        "about": {
          "title": "About NadaPay",
          "description": "Leading payment solutions for modern businesses. Secure, fast and reliable transactions."
        },
        "links": {
          "title": "Quick Links",
          "home": "Home",
          "about": "About Us",
          "services": "Services",
          "contact": "Contact"
        },
        "legal": {
          "title": "Legal",
          "terms": "Terms of Service",
          "privacy": "Privacy Policy",
          "cookies": "Cookie Policy"
        },
        "social": {
          "title": "Follow Us"
        },
        "newsletter": "Subscribe to our newsletter for updates",
        "copyright": "© {year} NadaPay. All rights reserved."
      }
    }
  },
  ar: {
    translation: {
      "navbar": {
        "home": "الصفحة الرئيسية",
        "about": "من نحن",
        "services": "خدماتنا",
        "why": "لماذا نحن",
        "login": "تسجيل الدخول",
        "register": "تسجيل"
      },
      "hero": {
        "title": "مدفوعات أذكى مع NadaPay",
        "subtitle": "استقبل المدفوعات بكل سهولة عبر بوابات دفع آمنة وروابط دفع مباشرة. ندعم مدى، فيزا، ماستركارد، Apple Pay وSTC Pay.",
        "cta1": "ابدأ الآن",
        "cta2": "تواصل معنا"
      },
      "about": {
        "title": "من نحن",
        "content": "NadaPay هي شركة حديثة في مجال حلول الدفع الإلكتروني، تمكّن الشركات من جميع الأحجام من قبول المدفوعات بسرعة وأمان. سواء كنت تدير متجرًا إلكترونيًا أو تقدم خدمات، منصتنا تساعدك على تحصيل مدفوعاتك بسهولة عبر بوابات دفع مخصصة وروابط فورية."
      },
      "services": {
        "title": "خدماتنا",
        "items": [
          {
            "title": "بوابات الدفع الإلكتروني",
            "description": "بوابات متكاملة وآمنة للمواقع الإلكترونية والتطبيقات."
          },
          {
            "title": "روابط الدفع",
            "description": "أنشئ وأرسل روابط الدفع خلال ثوانٍ – بدون الحاجة إلى موقع إلكتروني."
          },
          {
            "title": "دعم جميع البطاقات",
            "description": "قبول المدفوعات عبر مدى، فيزا، ماستركارد، Apple Pay وSTC Pay."
          },
          {
            "title": "لوحة تحكم وتحليلات",
            "description": "راقب العمليات المالية واطلع على تقارير مفصلة بسهولة."
          }
        ]
      },
      "why": {
        "title": "لماذا NadaPay؟",
        "items": [
          "تكامل سهل",
          "تتبع المعاملات في الوقت الفعلي",
          "معتمد PCI-DSS",
          "أسعار شفافة"
        ]
      },
      "login": {
        "title": "تسجيل الدخول إلى NadaPay",
        "subtitle": "أدخل بياناتك للوصول إلى حسابك",
        "email": "البريد الإلكتروني",
        "password": "كلمة المرور",
        "forgotPassword": "نسيت كلمة المرور؟",
        "signIn": "تسجيل الدخول",
        "or": "أو",
        "noAccount": "ليس لديك حساب؟",
        "createAccount": "إنشاء حساب"
      },
      "register": {
        "title": "إنشاء حساب",
        "subtitle": "ابدأ مع NadaPay في دقائق",
        "fullName": "الاسم الكامل",
        "email": "البريد الإلكتروني",
        "password": "كلمة المرور",
        "company": "الشركة (اختياري)",
        "createAccount": "إنشاء حساب",
        "or": "أو",
        "haveAccount": "لديك حساب بالفعل؟",
        "signIn": "تسجيل الدخول"
      },
      // Add this part for the footer
      "footer": {
        "about": {
          "title": "عن ناداباي",
          "description": "حلول دفع رائدة للشركات الحديثة. معاملات آمنة وسريعة وموثوقة."
        },
        "links": {
          "title": "روابط سريعة",
          "home": "الرئيسية",
          "about": "من نحن",
          "services": "الخدمات",
          "contact": "اتصل بنا"
        },
        "legal": {
          "title": "قانوني",
          "terms": "شروط الخدمة",
          "privacy": "سياسة الخصوصية",
          "cookies": "سياسة الكوكيز"
        },
        "social": {
          "title": "تابعنا"
        },
        "newsletter": "اشترك في نشرتنا البريدية للحصول على التحديثات",
        "copyright": "© {year} ناداباي. جميع الحقوق محفوظة."
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
