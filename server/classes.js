class Spotify {
  constructor(obj) {
    this.name = obj.name;
    this.id = obj.id;
  }
}

export class Artist extends Spotify {
  constructor(obj) {
    super(obj);
    this.genres = obj.genres;
    this.imageURL = obj.images[0].url;
  }
}

export class Album extends Spotify {
  constructor(obj) {
    super(obj);
    this.imageURL = obj.images[1].url;
  }
}

export class Track extends Spotify {
  constructor(obj) {
    super(obj);
    this.album = obj.album.name;
  }
}
