// const gfname ="mrsRandom"
// export const gfname2 ="mrsRandom2"
// export const gfname3 ="mrsRandom3"

// module.exports=gfname; // package.json file me  enter a "type":"commanjs" when you can use this

// export default gfname;

// export {gfname2,gfname3}


export const generateLovePercent = ()=>{
    // return `${Math.floor(Math.random()*100)}%`
    return `${~~(Math.random()*100)}%` // also use ~~
}