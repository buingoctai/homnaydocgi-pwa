import React, { useEffect } from "react";
import SkeletonV2 from 'srcRoot/components/SkeletonV2';


const SkeletonArticles = () => {

    useEffect(()=>{
        debugger
    });
    // return <>{[7].map((item, index) => <SkeletonV2 numLine={item} theme="light"/>)}</>

    return (
        <>
          <p>Header </p>
        <p>Content </p>
        </>
      
    );
}

export default SkeletonArticles;