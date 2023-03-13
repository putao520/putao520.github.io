import {useState} from 'react';
import data from '@/data.json';
import DownAcrossSvg from '@assets/svg/down-across';
import ScreensShot2x from '@assets/images/screenshot-001@2x.png';
import browser from "browser-tool";
import MacSvg from '@assets/svg/mac';
import WindowSvg from '@assets/svg/window';
import LinuxSvg from '@assets/svg/linux';

export default function Home() {
    const browserInfo = browser();

    const iconList = {
        mac: MacSvg,
        windows: WindowSvg,
        linux: LinuxSvg,
        unknow: ""
    }

    function loadDownloadBlock() {
        if (browserInfo.device !== 'PC') {
            return 'unknow'
        }
        if (browserInfo.platform.startsWith('Win') ) {
            return 'windows'
        } else {
            return 'unknow'
        }
    }

    const label = loadDownloadBlock()
    const [softList, setSoftList] = useState(data.soft)
    const softListEl = Object.keys(softList).filter(key=>(key !== 'unknow' && key !== label)).map(key=>{
        const item = softList[key]
        return <li key={key}><i>{iconList[key]()}</i><span>{item.desc}</span></li>
    })


    const [downloadBlock, setDownloadBlock] = useState(data.soft[label])
    const more = ()=>{
        return <span>了解更多</span>
    }

    const [platformListState, setPlatformListState] = useState(false)
    const platformList = ()=>{
        if( platformListState ) {
            return <div role="tooltip" id="el-popover-8008" aria-hidden="true" className="el-popover el-popper download-popover">
                        <ul className="platform-list">
                            {softListEl}
                        </ul>
            </div>
        }
    }
    const togglePlatformList = ()=>{
        setPlatformListState(!platformListState)
    }
    const selectPlatform = ()=>{
        return <span>
            {platformList()}
            <span className="el-popover__reference-wrapper">
                <div className="select-platform"><i>{iconList[label]()}</i>
                    <span onClick={togglePlatformList}><DownAcrossSvg/></span>
                </div>
            </span>
        </span>
    }
    return (
        <div className="page-inner page-home">
            <div className="page__inner">
                <div className="firework"><span className="char1">M</span> <span className="char2">o</span> <span
                    className="char3">t</span> <span className="char4">r</span> <span className="char5">i</span> <span
                    className="char6">x</span></div>
                <header className="mo-header cf">
                    <div className="app-icon"></div>
                    <h1 className="mo-header__title">
                        {data.description}
                    </h1>
                    <p className="mo-header__desc">
                    {data.seo.description}
                </p>
                    <div className="info">
                        <div className="download-btn">
                            <a href={downloadBlock.download} className="download-link">{downloadBlock.label}</a>

                        </div>
                        <a href={downloadBlock.download} className="version" style={{marginLeft: '8px'}}>
                            v{downloadBlock.version}
                            <sup>New</sup></a>
                        <div className="view-features">
                            <div className="view-features-link"><i></i> </div>
                        </div>
                    </div>
                    <p className="other-links">
                        <a href={data.git.url} target="_blank">
                            <i><svg version="1.1" role="presentation" width="20" height="20" viewBox="0 0 24 24" className="mo-icon MoIcon">
                                <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M12,0.3c-6.6,0-12,5.4-12,12c0,5.3,3.4,9.8,8.2,11.4 C8.8,23.8,9,23.4,9,23.1c0-0.3,0-1,0-2c-3.3,0.7-4-1.6-4-1.6c-0.5-1.4-1.3-1.8-1.3-1.8C2.5,17,3.7,17,3.7,17 c1.2,0.1,1.8,1.2,1.8,1.2c1.1,1.8,2.8,1.3,3.5,1c0.1-0.8,0.4-1.3,0.8-1.6c-2.7-0.3-5.5-1.3-5.5-5.9c0-1.3,0.5-2.4,1.2-3.2 C5.5,8.1,5,6.9,5.7,5.3c0,0,1-0.3,3.3,1.2c1-0.3,2-0.4,3-0.4c1,0,2,0.1,3,0.4c2.3-1.6,3.3-1.2,3.3-1.2c0.7,1.7,0.2,2.9,0.1,3.2 c0.8,0.8,1.2,1.9,1.2,3.2c0,4.6-2.8,5.6-5.5,5.9c0.4,0.4,0.8,1.1,0.8,2.2c0,1.6,0,2.9,0,3.3c0,0.3,0.2,0.7,0.8,0.6 c4.8-1.6,8.2-6.1,8.2-11.4C24,5.7,18.6,0.3,12,0.3z">
                                    </path>
                                </g>
                            </svg></i>
                            <span>开源软件, 欢迎PR</span>
                        </a>
                    </p>
                </header>
                <figure className="poster"><img src={ScreensShot2x} alt="GrapeRPA"/></figure>
            </div>
        </div>
    )
}
