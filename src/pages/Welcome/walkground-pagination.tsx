import React from 'react';
import { buildClassName } from 'srcRoot/utils/index-v2';

const WalkgroundPagination = (props: { showingPage: number; pageList: Array<number> }) => {
  return (
    <div className="walkground-pagination">
      {/* <a className= {buildClassName("dot",sho "active")}></a>
        <a className="dot"></a>
        <a className="dot"></a>
        <a className="dot"></a> */}
      {props.pageList.map((p) => (
        <a className={buildClassName('dot', props.showingPage === p && 'active')} />
      ))}
    </div>
  );
};

export default WalkgroundPagination;
