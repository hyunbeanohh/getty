import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { ArrowLeft, Send, CheckCircle, AlertCircle } from 'lucide-react';

const RequestPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clubName: '',
    description: '',
    positions: '',
    contactEmail: '',
    contactName: '',
    additionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // 알림 메시지 자동 숨김 효과
  useEffect(() => {
    if (submitStatus === 'success' || submitStatus === 'error') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000); // 5초 후 자동으로 사라짐

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
        // EmailJS 설정 - 실제 사용시에는 환경변수로 관리하세요
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      await emailjs.send(
        serviceId,
        templateId,
        {
          club_name: formData.clubName,
          description: formData.description,
          positions: formData.positions,
          contact_email: formData.contactEmail,
          contact_name: formData.contactName,
          additional_info: formData.additionalInfo,
          to_email: 'ohb4199@gmail.com' // 관리자 이메일
        },
        publicKey
      );

      setSubmitStatus('success');
      setFormData({
        clubName: '',
        description: '',
        positions: '',
        contactEmail: '',
        contactName: '',
        additionalInfo: ''
      });
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.clubName && formData.description && formData.contactEmail && formData.contactName;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="max-w-2xl w-full mx-auto px-4">
        {/* 헤더 */}
        <div className="relative flex items-center justify-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="absolute left-0 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            
          </button>
          <h1 className="text-3xl font-bold text-gray-800">동아리 모집 요청</h1>
        </div>

        {/* 알림 메시지 */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800">요청이 성공적으로 전송되었습니다! 검토 후 연락드리겠습니다.</span>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-800">요청 전송에 실패했습니다. 잠시 후 다시 시도해주세요.</span>
          </div>
        )}

        {/* 폼 */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 동아리명 */}
            <div>
              <label htmlFor="clubName" className="block text-sm font-medium text-gray-700 mb-2">
                동아리명 *
              </label>
              <input
                type="text"
                id="clubName"
                name="clubName"
                value={formData.clubName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="동아리명을 입력해주세요"
                required
              />
            </div>

            {/* 동아리 설명 */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                동아리 설명 *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                placeholder="동아리에 대한 간단한 설명을 입력해주세요"
                required
              />
            </div>

            {/* 모집 직군 */}
            <div>
              <label htmlFor="positions" className="block text-sm font-medium text-gray-700 mb-2">
                모집 직군
              </label>
              <input
                type="text"
                id="positions"
                name="positions"
                value={formData.positions}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="예: 프론트엔드, 백엔드, 디자인, 기획"
              />
            </div>

            {/* 연락처 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                  담당자명 *
                </label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="담당자명을 입력해주세요"
                  required
                />
              </div>

              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  연락처 이메일 *
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="example@email.com"
                  required
                />
              </div>
            </div>

            {/* 추가 정보 */}
            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
                추가 정보
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                placeholder="모집 기간, 특별한 요구사항 등 추가 정보를 입력해주세요"
              />
            </div>

            {/* 제출 버튼 */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isFormValid && !isSubmitting
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    전송 중...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    모집 요청 보내기
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* 안내사항 */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">📋 안내사항</h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li>• 요청하신 내용은 검토 후 일주일 내에 연락드립니다.</li>
            <li>• 동아리 등록을 위해서는 추가적인 정보가 필요할 수 있습니다.</li>
            <li>• 등록된 동아리는 관리자 검토 후 사이트에 게시됩니다.</li>
            <li>• 문의사항이 있으시면 연락처 이메일로 문의해주세요.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RequestPage; 