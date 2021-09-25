import React from 'react';

interface Props {
  totalRecord: number;
}
const Title = (props: Props) => {
  const { totalRecord } = props;

  return (
    <>
      <div className="title-wrap">
        <span>{`Tất Cả: ${totalRecord}`}</span>
      </div>
    </>
  );
};

export default Title;
