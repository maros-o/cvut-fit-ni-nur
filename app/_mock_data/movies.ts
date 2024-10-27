export type Movie = {
  title: string;
  day: string;
  datetime: string;
  tags: string[];
  thumbnail_url: string;
};

const movies: Movie[] = [
  {
    title: "Transformers: Probuzení monster",
    day: "Pátek",
    datetime: "20.12. 20:00",
    tags: ["3D", "Titulky", "Akční", "Sci-Fi"],
    thumbnail_url:
      "https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/167/502/167502367_200hik.jpg",
  },
  {
    title: "V hlavě 2",
    day: "Sobota",
    datetime: "23.6. 14:30",
    tags: ["2D", "Dabing", "Animovaný", "Komedie"],
    thumbnail_url:
      "https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/168/714/168714795_o5bchr.jpg",
  },
  {
    title: "Já, padouch 4",
    day: "Sobota",
    datetime: "8.9. 12:45",
    tags: ["2D", "Dabing", "Animovaný", "Komedie"],
    thumbnail_url:
      "https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/169/041/169041061_7kr8oh.jpg",
  },
  {
    title: "Vlny",
    day: "Čtvrtek",
    datetime: "1.5. 18:45",
    tags: ["2D", "Drama", "Historický", "Thriller"],
    thumbnail_url:
      "https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/169/002/169002978_123omn.jpg",
  },
  {
    title: "Vetřelec: Romulus",
    day: "Úterý",
    datetime: "18.2. 20:30",
    tags: ["2D", "Titulky", "Sci-Fi", "Horor"],
    thumbnail_url:
      "https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/169/002/169002121_kb858t.jpg",
  },
  {
    title: "Úsměv 2",
    day: "Neděle",
    datetime: "18.2. 20:30",
    tags: ["2D", "Titulky", "Horor"],
    thumbnail_url:
      "https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/169/265/169265673_9w9cxy.jpg",
  },
  {
    title: "Venom: Poslední tanec",
    day: "Neděle",
    datetime: "18.2. 20:30",
    tags: ["2D", "Titulky", "Akční", "Sci-Fi"],
    thumbnail_url:
      "https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/169/342/169342049_0lu5s0.jpg",
  },
];

export const getRandomMovie = () =>
  movies[Math.floor(Math.random() * movies.length)];
