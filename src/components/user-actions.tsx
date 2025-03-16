import Link from 'next/link';

interface UserActionsProps {
  xpub?: string;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export default function UserActions({
  xpub = '',
  activeTab = '',
  onTabChange = () => {},
}: UserActionsProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'send', label: 'Send Bitcoin' },
  ];

  return (
    <div className="mb-6">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
