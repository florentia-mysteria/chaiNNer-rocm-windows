import semver from 'semver';
import { Version } from './common-types';

export const parse = (v: string): Version => {
    const version = semver.coerce(v);
    if (!version) {
        throw new SyntaxError(`Invalid version '${v}'`);
    }
    return version.version as Version;
};

export const versionLt = (lhs: Version, rhs: Version): boolean => {
    try {
        return semver.lt(parse(lhs), parse(rhs));
    } catch {
        return false;
    }
};

export const versionLte = (lhs: Version, rhs: Version): boolean => {
    try {
        return semver.lte(parse(lhs), parse(rhs));
    } catch {
        return false;
    }
};

export const versionGt = (lhs: Version, rhs: Version): boolean => {
    try {
        return semver.gt(parse(lhs), parse(rhs));
    } catch {
        return false;
    }
};

/**
 * Whether an installed dependency has to be updated to the required version.
 * A local version label (e.g. +rocm10.0.0 or +rocm) is not part of the semver
 * comparison, so "0.4.2" and "0.4.2+rocm" would look identical: in that case
 * the full strings are compared, as the backend does when installing.
 */
export const isDependencyOutdated = (required: Version, installed: Version): boolean => {
    if (required.includes('+') && required !== installed) {
        return true;
    }
    return versionGt(required, installed);
};

export const versionGte = (lhs: Version, rhs: Version): boolean => {
    try {
        return semver.gte(parse(lhs), parse(rhs));
    } catch {
        return false;
    }
};
