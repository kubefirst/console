export const formatDomain = (link: string, isMetaphor: boolean) => {
  if (!link) {
    return link;
  }

  const url = link?.includes('http') && new URL(link);

  if (!url) {
    return '';
  }

  const isGitLink = link.includes('github') || link.includes('gitlab');

  const domainOrPath = `${isGitLink ? url.pathname.substring(1) : url.hostname}`;

  if (isMetaphor) {
    const { hostname } = url;
    const hostnameList = hostname.split('.');
    const domain = `${hostnameList[hostnameList.length - 2]}.${
      hostnameList[hostnameList.length - 1]
    }`;

    return domainOrPath && domainOrPath.replace(`.${domain}`, '');
  }

  return domainOrPath;
};
