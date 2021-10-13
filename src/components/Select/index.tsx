import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Popover, { PopoverManager } from '@taibn.dev.vn/h-popover';
import { PopupIdentities } from 'srcRoot/utils/constants';
import Input from 'srcRoot/components/Input';
import Options, { Option } from './options';
import { buildClassName } from 'srcRoot/utils/index-v2';
import IconDropdown from 'srcRoot/static/svg/icon-outline-dropdown.svg';

import './style.scss';

const WIDTH_DROPDOWN = 120;

interface Props {
  identity: { windowId: string; name: string };
  options?: Array<Option>;
  selectedIdxs?: Array<number>;
  placeholder?: Option;
  onSelectOption?: (selection: any) => any;
}
const Select = (props: Props) => {
  const {
    identity,
    options,
    selectedIdxs: _selectedIdxs,
    placeholder = { key: 'all', idx: null, name: 'Tất cả' },
    onSelectOption,
  } = props;
  const inputRef = useRef(null);
  const [selectedIdxs, setSelectedIdxs] = useState<Array<number>>(_selectedIdxs);
  const [focusing, setFocusing] = useState(false);

  const handleOptions = useCallback((e) => {
    setFocusing(true);
    PopoverManager.openPopover(identity);
  }, []);

  const styleDropdown = useMemo(() => {
    if (inputRef.current) {
      const { width } = inputRef.current.getBoundingClientRect();

      return {
        marginTop: '5px',
        width: `${width - 16}px`,
        height: `${WIDTH_DROPDOWN}px`,
      };
    }
    return {
      marginTop: '5px',
      width: '186px',
      height: `${WIDTH_DROPDOWN}px`,
    };
  }, []);

  const inputWrapClassName = useMemo(() => {
    return buildClassName('input-wrap', focusing && 'focusing');
  }, [focusing]);

  const iconClassName = useMemo(() => {
    return buildClassName(focusing && 'anime-icon');
  }, [focusing]);

  const _onSelectOption = useCallback(
    (newIdx: number) => {
      setSelectedIdxs([...selectedIdxs, newIdx]);
      onSelectOption([...selectedIdxs, newIdx]);
    },
    [selectedIdxs]
  );

  const onUnSelectOption = useCallback(
    (newIdxs: Array<number>) => {
      setSelectedIdxs([...newIdxs]);
      onSelectOption([...newIdxs]);
    },
    [selectedIdxs]
  );

  const genPlaceholder = useCallback((): string => {
    if (selectedIdxs.length === 0) return placeholder.name;

    const last = options[selectedIdxs[selectedIdxs.length - 1]];
    if (selectedIdxs.length === 1) return `${last.name}`;
    return `${last.name} +${selectedIdxs.length - 1} khác`;
  }, [selectedIdxs]);

  useEffect(() => {
    setSelectedIdxs(_selectedIdxs);
  }, [_selectedIdxs]);

  return (
    <div className="select-wrap">
      <div ref={inputRef} className={inputWrapClassName} onClick={handleOptions}>
        <Input
          text={genPlaceholder()}
          disabled={true}
          className="truncate"
          onBlur={() => setFocusing(false)}
          style={{ fontSize: '16px' }}
        />
        <img src={IconDropdown} className={iconClassName} />
      </div>
      <div>
        <Popover
          identity={identity}
          content={
            <div className="select-wrap__pop">
              <Options
                options={options}
                selectedIdxs={selectedIdxs}
                onSelect={_onSelectOption}
                onUnSelect={onUnSelectOption}
              />
            </div>
          }
          anchorEl={inputRef.current}
          style={styleDropdown}
        />
      </div>
    </div>
  );
};

export default Select;

export { Option };
