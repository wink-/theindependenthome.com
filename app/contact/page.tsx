import ContactForm from '@/components/ContactForm'

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      <p className="mb-8">
        Please use the form below to get in touch with us. We will reply using email only.
      </p>
      <ContactForm />
    </div>
  )
}

