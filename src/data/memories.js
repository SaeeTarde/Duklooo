// ✏️ EDIT EVERYTHING IN THIS FILE TO MAKE IT YOURS

export const config = {
  // 🔐 Password screen
  password: "sawaal",                       // <- YOUR PASSWORD (not case sensitive)
  hint: "Our first fav song... Hindi💭",          // <- YOUR HINT
  wrongMessages: [                          // <- playful errors, shown at random
    "Hmm, not quite… think harder 😏",
    "Nice try, but no 🙈",
    "Do you even love me? 😭",
  ],

  // 🏛️ Museum header (shown after unlocking)
  museumTitle: "The Museum of Us",
  museumSubtitle: "Happy Boyfriend Day, my love",
  boyfriendName: "Dukloooo",          // <- HIS NAME
  closingNote: "There are many more exhibits still to come. ❤️",
}

// 🖼️ ADD, REMOVE OR REORDER MEMORIES BELOW
// Photos go in:  public/photos/   Songs go in:  public/songs/

////songs
//1st-call it what u want. 
//2nd-
export const memories = [
  {
    id: 1,
    title: "The Picture of Us",
    date: "14 Feb 2023",
    photo: "/photos/0th.jpeg",
    message:
      "My heart’s been borrowed and yours has been blue. All’s well that ends well to end up with you.",
    song: "/songs/song1.mp3",
    songTitle: "Call it what you want!",
  },
  {
    id: 2,
    title: "First Hangout",
    date: "10 Aug 2023",
    photo: "/photos/2nd.png",
    message:
      "You showed me colors you know I can’t see with anyone else.",
    song: "/songs/song2.mp3",
    songTitle: "KTMBK",
  },
  {
    id: 3,
    title: "OG Spot",
    date: "10 Aug 2023",
    photo: "/photos/1st.jpeg",
    message:
      "Buy the paint in the color of your eyes. And graffiti my whole damn life.",
    song: "/songs/song2.mp3",
    songTitle: "Song Name - Artist",
  },
  {
    id: 4,
    title: "PIZZA",
    date: "10 Aug 2023",
    photo: "/photos/4th.jpeg",
    message:
      "Your past and mine are parallel lines, stars all aligned and they intertwined. ",
    song: "/songs/song2.mp3",
    songTitle: "Song Name - Artist",
  },
  {
    id: 5,
    title: "PASTAA",
    date: "10 Aug 2023",
    photo: "/photos/3rd.png",
    message:
      "All the time you've spent on me. . . It's honestly wild . . . All the effort you've put in. . . It's actually romantic!",
    song: "/songs/song2.mp3",
    songTitle: "Song Name - Artist",
  },
  {
    id: 6,
    title: "Always made made me laugh. . .",
    date: "10 Aug 2023",
    photo: "/photos/6th.jpeg",
    message:
      "The stakes are high, the water’s rough, but this love is ours.",
    song: "/songs/song2.mp3",
    songTitle: "Song Name - Artist",
  },
  {
    id: 7,
    title: "My favorite pic of my kuchuu puchuu",
    date: "10 Aug 2023",
    photo: "/photos/8thh.jpeg",
    message:
      "And I can’t let you go. Your handprint’s on my soul.",
    song: "/songs/song2.mp3",
    songTitle: "Song Name - Artist",
  },
   {
    id: 8,
    title: "Ohh Burgerrr and Friesss",
    date: "10 Aug 2023",
    photo: "/photos/8th.jpeg",
    message:
      "The rest of the world was black and white, but we were in screaming color.",
    song: "/songs/song2.mp3",
    songTitle: "Song Name - Artist",
  },
   {
    id: 9,
    title: "Ahhh I think I am gonna die. . . . .",
    date: "10 Aug 2023",
    photo: "/photos/9th.jpeg",
    message:
      "You should think about the consequence - Of your magnetic field being a little too strong",
    song: "/songs/song2.mp3",
    songTitle: "Song Name - Artist",
  },
  {
    id: 10,
    title: "I think our hands fit perfect together. . . don't you. . . ",
    date: "10 Aug 2023",
    photo: "/photos/10th.jpeg",
    message:
      "Can I go where you go? Can we always be this close forever and ever?",
    song: "/songs/song2.mp3",
    songTitle: "Song Name - Artist",
  },
  // 👇 Copy-paste a block like this to add more memories
  // {
  //   id: 3,
  //   title: "Title",
  //   date: "Date",
  //   photo: "/photos/photo3.jpg",
  //   message: "Your message",
  //   song: "/songs/song3.mp3",
  //   songTitle: "Song - Artist",
  // },
  
]