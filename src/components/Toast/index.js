import React from 'react';
import Loading from 'srcRoot/components/LoadingV2';
import ToastManager, { TOAST_TYPE } from './manager';
import IconOK from 'srcRoot/static/svg/icon-toast-ok.svg';
import IconInfo from 'srcRoot/static/svg/icon-toast-info.svg';
import IconWarning from 'srcRoot/static/svg/icon-toast-warning.svg';
import IconError from 'srcRoot/static/svg/icon-toast-error.svg';

import './style.scss';
// const myDefaultProps = {
//     noBackground,
//     type,
//     textKey,
//     textArguments,
//     className,
//     textKey,
//     textArguments,
// };

export const ToastComp = React.forwardRef(
  (
    {
      className,
      noBackground,
      onClickBackground,
      onClickContent,
      text,
      type,
      darkmode = true,
      global = true,
      ...props
    },
    ref
  ) => {
    const [cls, setCls] = React.useState('come-in');

    React.useImperativeHandle(ref, () => {
      return {
        fadeout: () => {
          setCls('get-out');
        },
      };
    });

    let icon = null;
    switch (type) {
      case TOAST_TYPE.SUCCESS: {
        icon = <img src={IconOK} width={40} height={30} />;
        break;
      }
      case TOAST_TYPE.INFO: {
        icon = <img src={IconInfo} width={40} height={30} />;
        break;
      }
      case TOAST_TYPE.WARNING: {
        icon = <img src={IconWarning} width={40} height={30} />;
        break;
      }
      case TOAST_TYPE.ERROR: {
        icon = <img src={IconError} width={40} height={30} />;
        break;
      }
      case TOAST_TYPE.LOADING: {
        let st = { marginBottom: '16px', borderWidth: '3px' };
        if (darkmode) {
          st = {
            ...st,
            borderColor: 'var(--white-500)',
            borderTopColor: 'var(--white-300)',
          };
        }
        icon = <Loading size={40} style={st} />;
        break;
      }
    }
    return (
      <div
        className={
          'flx flx-al-c flx-center toast-v2 ' +
          cls +
          (noBackground ? ' no-background ' : '') +
          (darkmode ? '' : ' light-mode ') +
          (global ? ' ' : ' inner-dom ') +
          (className || '')
        }
        onClick={onClickBackground}
      >
        <div className="toast-content flx flx-al-c flx-center flx-col" onClick={onClickContent}>
          {icon}
          {text ? <div>{text}</div> : null}
        </div>
      </div>
    );
  }
);

export default function Toast(props) {
  const compRef = React.useRef();

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    // did mount
    ToastManager.subscribe({
      set: (_data) => {
        const update = () => {
          setData(_data);
        };
        if (!_data) {
          if (compRef?.current) {
            compRef.current.fadeout();
          }
          setTimeout(() => {
            update();
          }, 500);
        } else {
          update();
        }
      },
      get: () => data,
    });
  }, []);

  function onClickBackground() {
    ToastManager.close();
  }

  function onClickContent(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  if (!data) return null;
  return (
    <ToastComp
      className={data.className}
      noBackground={data.noBackground}
      onClickBackground={onClickBackground}
      onClickContent={onClickContent}
      text={data.text}
      textKey={data.textKey}
      type={data.type}
      ref={compRef}
    />
  );
}

export { ToastManager, TOAST_TYPE };
