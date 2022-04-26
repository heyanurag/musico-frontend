import { atom } from "recoil";

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue) => {
      //   if (newValue instanceof DefaultValue) {
      //     localStorage.removeItem(key);
      //   } else {
      localStorage.setItem(key, JSON.stringify(newValue));
      //   }
    });
  };

export const user = atom({
  key: "user",
  default: null,
  effects_UNSTABLE: [localStorageEffect("user")],
});

export const nowPlaying = atom({
  key: "nowPlaying",
  default: null,
});

export const tracks = atom({
  key: "tracks",
  default: [],
});

export const topMusicState = atom({
  key: "topMusic",
  default: [
    {
      id: "1",
      name: "Valerie",
      imgUrl:
        "https://randomwordgenerator.com/img/picture-generator/5ee6d6454d57b10ff3d8992cc12c30771037dbf852547848702a7ed4974c_640.jpg",
    },
    {
      id: "2",
      name: "Valerie1",
      imgUrl:
        "https://randomwordgenerator.com/img/picture-generator/5ee2d1404d52b10ff3d8992cc12c30771037dbf85254784a70287fd2924f_640.jpg",
    },
    {
      id: "3",
      name: "Valerie2",
      imgUrl:
        "https://randomwordgenerator.com/img/picture-generator/52e1d6404355b10ff3d8992cc12c30771037dbf85254784a722d73d0934e_640.jpg",
    },
    {
      id: "4",
      name: "Valerie3",
      imgUrl:
        "https://randomwordgenerator.com/img/picture-generator/57e5d34a4c50a414f1dc8460962e33791c3ad6e04e507440762e7adc9548cd_640.jpg",
    },
    {
      id: "5",
      name: "Valerie4",
      imgUrl:
        "https://randomwordgenerator.com/img/picture-generator/57e1d1434954aa14f1dc8460962e33791c3ad6e04e50744172297ed29348c6_640.jpg",
    },
    {
      id: "6",
      name: "Valerie5",
      imgUrl:
        "https://randomwordgenerator.com/img/picture-generator/52e6d6454c5bac14f1dc8460962e33791c3ad6e04e5074417c2d78dc974ec4_640.jpg",
    },
    {
      id: "7",
      name: "Valerie6",
      imgUrl:
        "https://randomwordgenerator.com/img/picture-generator/55e6dd474b5baa14f1dc8460962e33791c3ad6e04e5074417c2d78d19f48c3_640.jpg",
    },
    {
      id: "8",
      name: "Valerie7",
      imgUrl:
        "https://randomwordgenerator.com/img/picture-generator/anton-darius-2pH3TnjoZ0o-unsplash.jpg",
    },
    {
      id: "9",
      name: "Valerie8",
      imgUrl:
        "https://randomwordgenerator.com/img/picture-generator/5ee6d6454d57b10ff3d8992cc12c30771037dbf852547848702a7ed4974c_640.jpg",
    },
    {
      id: "10",
      name: "Valerie9",
      imgUrl:
        "https://randomwordgenerator.com/img/picture-generator/5ee2d1404d52b10ff3d8992cc12c30771037dbf85254784a70287fd2924f_640.jpg",
    },
    {
      id: "11",
      name: "Valerie10",
      imgUrl:
        "https://randomwordgenerator.com/img/picture-generator/anton-darius-2pH3TnjoZ0o-unsplash.jpg",
    },
    {
      id: "12",
      name: "Valerie11",
      imgUrl:
        "https://randomwordgenerator.com/img/picture-generator/52e6d6454c5bac14f1dc8460962e33791c3ad6e04e5074417c2d78dc974ec4_640.jpg",
    },
    {
      id: "13",
      name: "Valerie61",
      imgUrl:
        "https://randomwordgenerator.com/img/picture-generator/55e6dd474b5baa14f1dc8460962e33791c3ad6e04e5074417c2d78d19f48c3_640.jpg",
    },
    {
      id: "14",
      name: "Valerie71",
      imgUrl:
        "https://randomwordgenerator.com/img/picture-generator/anton-darius-2pH3TnjoZ0o-unsplash.jpg",
    },
    {
      id: "15",
      name: "Valerie81",
      imgUrl:
        "https://randomwordgenerator.com/img/picture-generator/5ee6d6454d57b10ff3d8992cc12c30771037dbf852547848702a7ed4974c_640.jpg",
    },
    {
      id: "16",
      name: "Valerie91",
      imgUrl:
        "https://randomwordgenerator.com/img/picture-generator/5ee2d1404d52b10ff3d8992cc12c30771037dbf85254784a70287fd2924f_640.jpg",
    },
    {
      id: "17",
      name: "Valerie101",
      imgUrl:
        "https://randomwordgenerator.com/img/picture-generator/anton-darius-2pH3TnjoZ0o-unsplash.jpg",
    },
    {
      id: "18",
      name: "Valerie111",
      imgUrl:
        "https://randomwordgenerator.com/img/picture-generator/52e6d6454c5bac14f1dc8460962e33791c3ad6e04e5074417c2d78dc974ec4_640.jpg",
    },
  ],
});
