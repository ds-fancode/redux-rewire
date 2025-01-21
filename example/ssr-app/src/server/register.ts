// import babel from '@babel/register'
// import register, {noOp} from 'ignore-styles'
//
// const extensions = ['.gif', '.jpeg', '.jpg', '.png', '.svg']
//
// register(undefined, (module, filename) => {
//   if (!extensions.find(f => filename.endsWith(f))) {
//     // If we find a style
//     return noOp()
//   }
// })
// babel({
//   presets: [
//     '@babel/preset-env', // For modern JavaScript features (ES6+)
//     '@babel/preset-react' // For JSX support
//   ],
//   extensions: ['.js', '.jsx'], // So Babel will transpile .js and .jsx files
//   ignore: [/\/(build|node_modules)\//]
//   // plugins: [
//   //   [
//   //     'transform-require-ignore',
//   //     {
//   //       extensions: ['.less', '.sass', '.css']
//   //     }
//   //   ]
//   // ]
// })
