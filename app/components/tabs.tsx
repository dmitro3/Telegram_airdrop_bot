interface TabsProps {
  activeTab: number;
  setActiveTab: (activeTab: number) => void;
  tabLabels: string[];
}

const Tabs = ({ activeTab, setActiveTab, tabLabels }: TabsProps) => {
  return (
    <div>
      <div className="flex justify-between p-[10px] sticky top-1 z-20 h-[56px] bg-[#FFFFFF] rounded-[10px]">
        {tabLabels.map((label, index) => {
          return (
            <button
              key={label}
              data-active={activeTab === index}
              className="flex justify-center items-center flex-auto rounded-[6px] text-sm text-[#5B586A] data-[active=true]:bg-gradient-to-b data-[active=true]:from-[#FFAB07] data-[active=true]:to-[#E76116] data-[active=true]:shadow-[0px_2px_0px_0px_#DC6E09] data-[active=true]:text-white data-[active=true]:border data-[active=true]:border-[#FF8A00]"
              onClick={() => setActiveTab(index)}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
