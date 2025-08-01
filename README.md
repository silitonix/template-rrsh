# TEMPLATE-RRSH 🚀

## Features 🌟

- **Shadcn UI**: shadcn ready with theme support
- **React Router 7**: preconfigured file aprouch
- **Multilingual**: used i18n for multilingual support including routes
- **Global error handling**: implemented 404 or etc error state handeling

## Getting Started 🛠️

- downloading from source
```bash
wget https://github.com/silitonix/template-rrsh/archive/refs/heads/main.zip &&
unzip main.zip &&
rm main.zip
```
- using bun 
```bash
bun create silitonix/template-rrsh --force
```
### Installation

Install the dependencies:

```bash
bun install
```

### Development 📦

Start the development server with HMR:

```bash
bun run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
bun run build
```

## Deployment 🚀

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```
