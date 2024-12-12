import User, { UserDocument } from "../models/User.js";
import { GraphQLError } from "graphql";
import { signToken, AuthenticationError } from "../services/auth.js";
import { BookDocument } from "../models/Book.js";

interface UserArgs {
    userID: string;
}

interface CreateUserArgs {
    username: string;
    email: string;
    password: string;
}

interface LoginArgs {
    email: string;
    password: string;
}

interface AddBookArgs {
    userID: string;
    book: BookDocument
}

interface DeleteBookArgs {
    bookID: string
}

const resolvers = {
    Query: {
        me: async (_parent: unknown, _args: UserArgs, context: any) => {
            console.log('Query success', context.user)

            return await User.findOne({ _id: context.user._id }).populate('savedBooks')
        }
    },

    Mutation: {
        addUser: async (_: any, { username, email, password }: CreateUserArgs) => {
            const newUser = await User.create({ username, email, password })
            const token = signToken(username, email, newUser._id)
            return { token, newUser }
        } ,
        login: async (_: any, { email, password }: LoginArgs) => {
            const user = await User.findOne({ email })
            if (!user || await user.isCorrectPassword(password)) {
                throw new AuthenticationError('No user found')
            }
            const token = signToken(user.username, user.email, user._id)
            return { token, user }
        },
        addBook: async (_parent: any, { book }: AddBookArgs, context: any) => {
            const user = await User.findById(context.user._id)
            if (!user) {
                throw new GraphQLError('User not found')
            }
            const updatedUser = await User.findByIdAndUpdate(
                user.id,
                { $addToSet: { savedBooks: book} },
                { new: true, runValidators: true}
            )
            if (!updatedUser) {
                throw new GraphQLError('Book could not be added')
            }
            console.log(updatedUser)
            return updatedUser
        },
        removeBook: async (_parent: any, { bookID }: DeleteBookArgs, context: any) => {
            const user = await User.findById(context.user._id)
            if (!user) {
                throw new GraphQLError('User not found')
            }
            const updatedUser = await User.findByIdAndUpdate(
                user.id,
                { $pull: { savedBooks: { bookID }} },
                { new: true, runValidators: true}
            )
            if (!updatedUser) {
                throw new GraphQLError('Book could not be deleted')
            }
            return updatedUser
        }
    }
}

export default resolvers