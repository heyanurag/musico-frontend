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
  default: [],
});

export const searchedMusicState = atom({
  key: "searchedMusic",
  default: [],
});
