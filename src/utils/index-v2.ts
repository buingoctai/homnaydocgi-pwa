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
