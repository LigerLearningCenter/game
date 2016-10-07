function Event(id, description, money, mood) {
    this.id = id;
    this.description = description;
    this.money = {
        industry: money[0],
        agriculture: money[1],
        consumerServices: money[2],
        infrastructure: money[3],
        education: money[4],
        tourism: money[5],
        ecology: money[6]
    }
    this.mood = {
        industry: mood[0],
        agriculture: mood[1],
        consumerServices: mood[2],
        infrastructure: mood[3],
        education: mood[4],
        tourism: mood[5],
        ecology: mood[6]
    }
}
