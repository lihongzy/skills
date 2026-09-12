#!/usr/bin/env node

import { lstat, mkdir, readdir, realpath, symlink } from "node:fs/promises";
import { homedir } from "node:os";
import { basename, dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryDirectory = resolve(scriptDirectory, "..");
const skillsDirectory = join(repositoryDirectory, "skills");
const destinationDirectory = join(homedir(), ".agents", "skills");
const excludedBuckets = new Set(["deprecated", "misc"]);
const checkOnly = process.argv.includes("--check");

const normalizePath = (path) =>
  process.platform === "win32" ? path.toLowerCase() : path;

async function lstatOrNull(path) {
  try {
    return await lstat(path);
  } catch (error) {
    if (error.code === "ENOENT") {
      return null;
    }

    throw error;
  }
}

async function findSkillDirectories(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  if (entries.some((entry) => entry.isFile() && entry.name === "SKILL.md")) {
    return [directory];
  }

  const childDirectories = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(directory, entry.name));

  return (await Promise.all(childDirectories.map(findSkillDirectories))).flat();
}

await mkdir(destinationDirectory, { recursive: true });

const skillDirectories = (await findSkillDirectories(skillsDirectory)).filter(
  (skillDirectory) => {
    const bucket = relative(skillsDirectory, skillDirectory).split(sep)[0];
    return !excludedBuckets.has(bucket);
  },
);

const names = new Set();

for (const skillDirectory of skillDirectories) {
  const name = basename(skillDirectory);

  if (names.has(name)) {
    throw new Error(`Found duplicate skill name: ${name}`);
  }

  names.add(name);

  const linkPath = join(destinationDirectory, name);
  const existing = await lstatOrNull(linkPath);
  const sourcePath = await realpath(skillDirectory);

  if (existing) {
    const existingTarget = await realpath(linkPath);

    if (normalizePath(existingTarget) === normalizePath(sourcePath)) {
      console.log(`Already linked: ${name}`);
      continue;
    }

    throw new Error(
      `Refusing to replace an existing skill: ${linkPath}\n` +
        `Existing target: ${existingTarget}\n` +
        `Expected target: ${sourcePath}`,
    );
  }

  if (checkOnly) {
    throw new Error(`Missing skill link: ${linkPath}`);
  }

  const linkType = process.platform === "win32" ? "junction" : "dir";
  await symlink(sourcePath, linkPath, linkType);
  console.log(`Linked: ${name} -> ${sourcePath}`);
}

console.log(checkOnly ? "Skill links are valid." : "Skill links are ready.");
