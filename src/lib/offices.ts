export interface Office {
  id: string;
  region: string;
  name: string;
  address: string;
  phone?: string;
  mapSrc: string;
  geo?: {
    lat: number;
    lng: number;
  };
  isMainOffice?: boolean;
}

export const offices: Office[] = [
  {
    id: "south",
    region: "MIỀN NAM - TRỤ SỞ CHÍNH",
    name: "ERA Vietnam (Trụ sở chính)",
    address: "Số 22 - 24, Đường số 5, KĐT Sala, P. An Khánh, TP. Thủ Đức, TP. Hồ Chí Minh",
    phone: "18006701",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31355.10350116574!2d106.7125376253905!3d10.781570777917167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529c73e041f1f%3A0xdaa106e0931962aa!2sERA%20Vietnam!5e0!3m2!1svi!2s!4v1776248529080!5m2!1svi!2s",
    geo: { lat: 10.7815708, lng: 106.7125376 },
    isMainOffice: true,
  },
  {
    id: "central",
    region: "MIỀN TRUNG",
    name: "ERA Vietnam - Chi nhánh Đà Nẵng",
    address: "Tầng 2, 368 Trần Hưng Đạo, Quận Sơn Trà, TP. Đà Nẵng",
    phone: "+84778571720",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15337.011008661819!2d108.22244994122025!3d16.05236865494923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421960ad594601%3A0x3ca7ecbfc778e473!2zRVJBIFZpZXRuYW0gLSBDaGkgbmjDoW5oIMSQw6AgTuG6tW5n!5e0!3m2!1svi!2s!4v1776248647025!5m2!1svi!2s",
    geo: { lat: 16.0523687, lng: 108.2224499 },
    isMainOffice: true,
  },
  {
    id: "north",
    region: "MIỀN BẮC",
    name: "ERA Vietnam - Chi nhánh Hà Nội",
    address: "Tòa nhà Viễn Đông, số 36 Hoàng Cầu, Quận Đống Đa, Hà Nội",
    phone: "+84986628222",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.3464456601896!2d105.82146467471416!3d21.018819488121032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abb4623fb1d3%3A0x10291e8bc5361d64!2sPeakview%20Tower!5e0!3m2!1svi!2s!4v1776248860207!5m2!1svi!2s",
    geo: { lat: 21.0188195, lng: 105.8214647 },
    isMainOffice: true,
  },
  {
    id: "artisan-park",
    region: "MIỀN NAM",
    name: "VPBH ERA Vietnam - Artisan Park",
    address: "Shop 156, Artisan Park, đường Phạm Văn Đồng, P. Bình Dương, TP. Hồ Chí Minh",
    phone: "",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3543.4608553901276!2d106.6861163!3d11.0647181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174cf007032c323%3A0x90f56f494cc5b9df!2sVPBH%20ERA%20Vietnam%20-%20Artisan%20Park!5e1!3m2!1svi!2s!4v1781085525324!5m2!1svi!2s",
  },
  {
    id: "nha-be",
    region: "MIỀN NAM",
    name: "VPDD ERA Vietnam - Nhà Bè",
    address: "Số 46, đường B13, Nguyễn Hữu Thọ, xã Nhà Bè, TP. Hồ Chí Minh",
    phone: "",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3547.8303991076186!2d106.717089!3d10.6973952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317531005fa71c03%3A0x4f0a7ee9d46efeb2!2sVPDD%20ERA%20Vietnam%20-%20Nh%C3%A0%20B%C3%A8!5e1!3m2!1svi!2s!4v1781085683446!5m2!1svi!2s",
  },
  {
    id: "binh-tan",
    region: "MIỀN NAM",
    name: "VPDD ERA Vietnam - Bình Tân",
    address: "696 Lê Trọng Tấn, P. Bình Hưng Hoà, TP. Hồ Chí Minh",
    phone: "",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3546.448302341507!2d106.6051239!3d10.814913100000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b003d1e3a13%3A0x2d98af7613dbf111!2sVPDD%20ERA%20Vietnam%20-%20B%C3%ACnh%20T%C3%A2n!5e1!3m2!1svi!2s!4v1781085739470!5m2!1svi!2s",
  },
  {
    id: "eco-retreat",
    region: "MIỀN NAM",
    name: "VPDD ERA Vietnam - Eco Retreat",
    address: "Phân khu Eco Bazaar, KĐT Eco Retreat, Nguyễn Hữu Trí, Bến Lức, Tây Ninh, Việt Nam",
    phone: "",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d324.899776261025!2d106.507779702524!3d10.66620260520707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310acd0023d91c1d%3A0x9f98069a35321fef!2zVlAgxJHhuqFpIGRp4buHbiBFUkEgVmlldG5hbSAtIEVjbyBSZXRyZWF0!5e1!3m2!1svi!2s!4v1781085789547!5m2!1svi!2s",
  },
];

export const mainOffices = offices.filter((office) => office.isMainOffice);
