type Parts = (string | false | undefined)[];

export const buildClassName = (...parts: Parts) => {
  return parts.filter(Boolean).join(' ');
};

export const translateTopicKeys = {
  Psychology: 'Tâm Lý Học',
  Marketing: 'Marketing',
  Sales: 'Bán Hàng',
  'AI/ML/DL Research': 'Trí Tuệ Nhân Tạo',
  'Personal Perspective': 'Góc Nhìn Cá Nhân',
  Philosophy: 'Triết Lý',
  Administration: 'Quản Trị',
  LeaderShip: 'Lãnh Đạo',
  'Software Development': 'Phát Triển Phần Mềm',
  Sociology: 'Xã Hội Học',
  Sport: 'Thể Thao',
  Finance: 'Tài Chính',
  Data: 'Dữ Liệu',
};

export const secondsToHms = (d: number) => {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? ' h, ' : ' h, ') : '';
  var mDisplay = m > 0 ? m + (m == 1 ? ' p, ' : ' p, ') : '';
  var sDisplay = s > 0 ? s + (s == 1 ? ' giây' : ' giây') : '';
  return hDisplay + mDisplay + sDisplay;
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
};

export const isMobileDevices = (): boolean => {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    return true;
  else return false;
};
