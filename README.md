# React Web Mail Register/Login Project 🥳
## Download
You can download the packages required by the project to the project with your existing package manager!
```bash
npm install
pnpm install
yarn
```

## A sample component object
```jsx
export const Example = () => {
    return (
        <div>
            <Helmet>
                <title>Title Name</title>
            </Helmet>
            <span>Example!</span>
        </div>
    ); 
};
```

## A sample route object
```js
module.exports = {
    baseUrl: "api", // baseUrl name (required)
    route: "test", // route name (required)
    method: "post", // request method (required)
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    run: async (req, res) => {
        // ...
    }
}
```

## License
[GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html)

## Authors and Acknowledgments
- Coded and designed by **[@devslenzy](https://discord.com/users/1070795507082985524)** and may not be shared anywhere without his permission!
