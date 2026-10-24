![MY DIU — bespoke brushed-metal project artwork](./assets/readme-metal-hero.svg)

# MY DIU

**A digital-campus product concept for bringing everyday student workflows into one considered experience.**

My DIU explores how campus information, student-facing tools, and routine university workflows might be organised into one coherent digital layer. The repository is a Next.js application foundation; do not assume university systems or institutional data are connected merely because the interface exists.

## Product map

| Surface | Intended role |
|---|---|
| Campus overview | Give students a useful starting point |
| Student workflows | Bring common tasks into a consistent interaction pattern |
| Information architecture | Make campus resources easier to find |
| Extensible components | Keep future services modular rather than hard-wired into one page |

## Build philosophy

A campus interface should make the next useful action obvious, use familiar language, remain responsive on mobile, and give clear feedback when a task is complete or unavailable. Institutional workflows must also treat identity, access, and student data as first-class concerns.

## Stack

Next.js · React · TypeScript · Framer Motion

## Run locally

**Requirements:** Node.js and npm.

```bash
git clone https://github.com/Kishordiu/My-DIU.git
cd My-DIU
npm ci
npm run dev
```

Open the local URL printed by Next.js, usually [http://localhost:3000](http://localhost:3000).

## Status and data boundary

**Status: digital-campus product concept.** Authentication, student records, timetables, attendance, grades, notifications, and university integrations must be verified individually before the project is described as connected to official campus systems. Do not load real student information into an unreviewed deployment.

---

<p align="center"><sub>DIU FOUNDRY · CAMPUS EXPERIENCE / PRODUCT ENGINEERING</sub></p>
