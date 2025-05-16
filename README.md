<p align="center">
  <img src="/public/favicon.svg" width="50" alt="Logo" />
</p>
<h1 align="center">Personal portfolio</h1>

[![Site preview](/public/site-preview.png)](https://smitcloud.org)

My personal portfolio website, showcasing my work and projects. Originally built with [Remix](https://remix.run/), [Three.js](https://threejs.org/), and [Framer Motion](https://www.framer.com/motion/). Based on an open-source template by HamishMW, with my own customizations. View the [live site](https://smitcloud.org).

## Install & run

Make sure you have nodejs `19.9.0` or higher and npm `9.6.3` or higher installed. Install dependencies with:

```bash
npm install
```

Once it's done start up a local server with:

```bash
npm run dev
```

To view the components storybook:

```bash
npm run dev:storybook
```

## Deployment

I've set up the site using Cloudflare for hosting. Deploy the site to Cloudflare Pages:

```bash
npm run deploy
```

## Permissions

I have used an open-source website from [HamishMW](https://github.com/HamishMW/portfolio), so I want to let everyone know that they are free to use it as well. The original author, HamishMW, created this site, and I encourage anyone who uses it to acknowledge their work.

If you decide to use this website, feel free to modify the theme and components to make it your own. However, if you are using the design largely unmodified, I’d appreciate it if you credit HamishMW as the original creator.

I do not give permission to present any of my projects as your own. This website serves as my portfolio, showcasing real projects I have worked on.

## FAQs

<details>
  <summary>How do I change the color on the <code>DisplacementSphere</code> (blobby rotating thing in the background).</summary>
  
  You'll need to edit the fragment shader. [Check out this issue for more details](https://github.com/HamishMW/portfolio/issues/19#issuecomment-870996615).
</details>

