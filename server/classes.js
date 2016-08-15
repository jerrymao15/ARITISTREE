export function Artist(obj) {
  this.name = obj.name;
  this.id = obj.id;
  this.genres = obj.genres;
  this.imageURL = obj.images[0].url;
}

export function Album(obj) {
  this.name = obj.name;
  this.id = obj.id;
  this.imageURL = obj.images[1].url;
}

export function Track(obj) {
  this.name = obj.name;
  this.id = obj.id;
  this.album = obj.album.name;
}
