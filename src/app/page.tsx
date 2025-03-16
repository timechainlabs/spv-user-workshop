import RegistrationForm from '../components/registration-form';

export default function Home() {
  return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Bitcoin SV SPV Wallet</h1>
          <p className="text-gray-600">Register your xpub or access your existing wallet</p>
        </div>
        
        <RegistrationForm />
      </div>
  );
}
