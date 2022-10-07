import React, {useState} from 'react';
import "./TabView.css";

function TabView({tabs ={} }) {

    const [activeTabIndex, setActiveTabIndex] = useState(0)

    const activateTab = (index)=>{
        setActiveTabIndex(index);
    }

    return (
        <div className='TabView'>
            <div className="tabs">
                {tabs.map((tab, index) =>
                    <button
                    key={index}
                    className={index === activeTabIndex ? "active-tab" : "tab"}
                    onClick = {() => activateTab(index)}
                    >{tab.icon}</button>
                    )
                }
            </div>
            {tabs[activeTabIndex].content}
        </div>
    )
}

export default TabView;