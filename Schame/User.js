const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Validation de l'email
    },
    password: {
      type: String,
    },
    first: {
      type: String,
      trim: true,
    },
    last: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      default: "https://example.com/default-avatar.jpg", // Avatar par défaut si absent
    },
    age: {
      type: Number,
      min: 0, // Âge minimum = 0
    },
    genre_preferences: {
      type: [String], // Tableau de chaînes de caractères
      default: [], // Valeur par défaut si non défini
    },
    favorite_books: {
      type: [String],
      default: [],
    },
    reading_history: {
      type: [String],
      default: [],
    },
    wishlist: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
      maxlength: 500, // Limite de la taille de la bio
      default: "",
    },
    isPremiumMember: {
      type: Boolean,
      default: false,
    },
    address: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      zip: {
        type: String,
      },
      country: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  if (this._update.password) {
    this._update.password = await bcrypt.hash(this._update.password, 10);
  }
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;