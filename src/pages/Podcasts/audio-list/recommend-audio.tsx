import React, { useCallback, useEffect } from "react";
import {getRecommendAudio,createMp3} from 'srcRoot/services/Podcasts';
import useFetchData from 'srcRoot/Hooks/use-fetch-data';
import LoadingV2 from 'srcRoot/components/LoadingV2';
import Button from 'srcRoot/components/Button';
import {secondsToHms, capitalizeFirstLetter} from 'srcRoot/utils/index-v2';
interface Props{
    audioId?:string,
    audioName:string,
}


const RecommendAudio = (props:Props) =>{
    if(!props.audioId) return null;
    const { response,status,setResponse} = useFetchData({
        api: getRecommendAudio,
        payload: { audioId:props.audioId },
        retryOptions: { retries: 3, retryDelay: 300 },
      });

    const addAddAudio = useCallback((_idx:number,url:string) => {
        const newres = {...response,recommendList: response['recommendList'].filter((r,idx)=> idx !==_idx)};
        setResponse(newres);
        createMp3({collectionId:response['folderId'], url});
    },[props,response]);

    return (
    <div className="recommend-container">
        <span className="title">Tất cả audio liên quan <span style={{fontStyle:'italic',fontSize:'16px'}}>{`"${capitalizeFirstLetter(props.audioName)}"`}</span></span>
        <div className="list">
            {!response || status ==='LOADING' ? (
                <LoadingV2
                    show={true}
                    type="LOADING_ARTICLE"
                    style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid #E5EFFF',
                        borderTop: '2px solid #0068FF',
                        borderwidth: '2px',
                        animation: 'loadingAnim 1s cubic-bezier(0, 0, 0, 0) infinite',
                    }}
                    /> 
            ): null}
            {response && response['recommendList'].map((r,idx) => (
                <div className="recommend-item">
                    <img src={r.thumb} width={60} height={40}/>
                    <span className="truncate-line title">
                        {capitalizeFirstLetter(r.title)}
                    </span> 
                    <span className="length">
                        {secondsToHms(r.lengthSeconds)}
                    </span>
                    <Button text="Thêm" onClick={() => addAddAudio(idx,r.url)} style={{fontSize:'12px'}}/>
                </div>
            ))}
        </div>
    </div>);
}

export default RecommendAudio;