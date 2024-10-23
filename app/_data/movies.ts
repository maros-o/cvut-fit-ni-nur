export type Movie = {
  title: string;
  day: string;
  datetime: string;
  tags: string[];
  thumbnail_url: string;
  length_min?: number;
};

const movies: Movie[] = [
  {
    title: "Transformers: Probuzení monster",
    day: "Pátek",
    datetime: "20.12. 20:00",
    tags: ["3D", "Titulky", "Akční", "Sci-fi"],
    length_min: 127,
    thumbnail_url:
      "https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/167/502/167502367_200hik.jpg",
  },
  {
    title: "V hlavě 2",
    day: "Sobota",
    datetime: "23.6. 14:30",
    tags: ["2D", "Dabing", "Animovaný", "Komedie"],
    length_min: 97,
    thumbnail_url:
      "https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/168/714/168714795_o5bchr.jpg",
  },
  {
    title: "Já, padouch 4",
    day: "Sobota",
    datetime: "8.9. 12:45",
    tags: ["2D", "Dabing", "Animovaný", "Komedie"],
    length_min: 94,
    thumbnail_url:
      "https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/169/041/169041061_7kr8oh.jpg",
  },
];

export const getRandomMovie = () =>
  movies[Math.floor(Math.random() * movies.length)];
