import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Fail() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const merchantOid = urlParams.get("merchant_oid");
    const failReason = urlParams.get("failed_reason_code");
    const failMessage = urlParams.get("failed_reason_msg");
    
    console.error("Payment failed:", {
      merchantOid,
      failReason,
      failMessage,
      timestamp: new Date().toISOString(),
      paymentId: urlParams.get("payment_id"),
    });

    const timer = setTimeout(() => {
      console.log("Redirecting to home page after payment failure");
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl mb-4 text-red-500">Ödeme Başarısız!</h1>
      <p className="text-lg mb-8">İşleminiz tamamlanamadı. Lütfen tekrar deneyiniz.</p>
      <p className="text-sm">5 saniye içinde ana sayfaya yönlendirileceksiniz...</p>
    </div>
  );
}