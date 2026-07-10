import type { ReactNode } from "react";

import LogoIcon from "@/assets/logo-icon";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CloudIcon } from "@heroicons/react/24/outline";

export type ComparisonData = {
  title: string;
  description: string;
  featuredColumn?: 2 | 3;
  features: {
    name: string;
    column1: string | ReactNode;
    column2: string | ReactNode;
    column3: string | ReactNode;
  }[];
  column1Header: {
    icon?: string | { light: string; dark: string } | ReactNode;
    title: string;
  };
  column2Header: {
    icon?: string | { light: string; dark: string } | ReactNode;
    title: string;
  };
  column3Header: string;
};

function isThemedIcon(
  icon: string | { light: string; dark: string } | ReactNode
): icon is { light: string; dark: string } {
  return typeof icon === "object" && icon !== null && "light" in icon && "dark" in icon;
}

function HeaderIcon({
  icon,
  className,
}: {
  icon: string | { light: string; dark: string } | ReactNode;
  className?: string;
}) {
  if (typeof icon !== "string" && !isThemedIcon(icon)) {
    return <>{icon}</>;
  }

  if (typeof icon === "string") {
    return <img src={icon} alt="" className={className} decoding="async" />;
  }

  return (
    <>
      <img src={icon.light} alt="" className={cn(className, "dark:hidden")} decoding="async" />
      <img src={icon.dark} alt="" className={cn(className, "hidden dark:block")} decoding="async" />
    </>
  );
}

const CompareUILib = ({ data }: { data: ComparisonData }) => {
  const featuredColumn = data.featuredColumn ?? 2;

  return (
    <div className="container-page">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 space-y-4 text-center md:mb-12 lg:mb-14">
          <h2
            id="compare-heading"
            className="text-heading font-semibold tracking-tight text-snow"
          >
            {data.title}
          </h2>
          <p className="mx-auto max-w-3xl text-body-lg text-ash">{data.description}</p>
        </div>

        <Card className="overflow-hidden border-white/10 bg-ink/80 py-0 shadow-card backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-obsidian/80">
                  <th className="h-25 w-68 p-4 text-left text-body-lg font-medium text-snow lg:text-subheading">
                    Features
                  </th>
                  <th className="h-25 w-68 p-4 text-left text-body-lg font-medium text-snow lg:text-subheading">
                    <div className="flex min-w-35 items-center gap-3.5">
                      {data.column1Header.icon ? (
                        <HeaderIcon icon={data.column1Header.icon} className="size-6 md:size-7.5" />
                      ) : (
                        <CloudIcon className="size-6 shrink-0 text-ash md:size-7.5" aria-hidden />
                      )}
                      <span>{data.column1Header.title}</span>
                    </div>
                  </th>
                  <th
                    className={cn(
                      "relative h-25 w-68 p-4 text-left text-body-lg font-semibold lg:text-subheading",
                      featuredColumn === 2
                        ? "bg-primary/12 text-snow"
                        : "font-medium text-snow"
                    )}
                  >
                    {featuredColumn === 2 && (
                      <span className="absolute inset-x-0 top-0 h-0.5 bg-primary" aria-hidden />
                    )}
                    <div className="flex min-w-35 items-center gap-3.5">
                      {data.column2Header.icon ? (
                        <HeaderIcon icon={data.column2Header.icon} className="size-7.5" />
                      ) : (
                        <LogoIcon className="size-7.5 shrink-0" />
                      )}
                      <span>{data.column2Header.title}</span>
                      {featuredColumn === 2 && (
                        <span className="rounded-badge bg-primary/20 px-2 py-0.5 text-caption font-semibold uppercase tracking-wider text-primary">
                          Recommended
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="h-25 p-4 text-left text-body-lg font-medium text-snow lg:text-subheading">
                    {data.column3Header}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.features.map((feature, index) => (
                  <tr
                    key={feature.name}
                    className={cn(
                      "h-25 transition-colors",
                      index < data.features.length - 1 && "border-b border-white/8",
                      index % 2 === 0 ? "bg-obsidian/20" : "bg-transparent"
                    )}
                  >
                    <td className="p-4 align-top">
                      <div className="text-body-lg font-medium text-snow">
                        {index + 1}. {feature.name}
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="text-body text-ash">{feature.column1}</div>
                    </td>
                    <td
                      className={cn(
                        "p-4 align-top",
                        featuredColumn === 2 && "border-x border-primary/15 bg-primary/[0.06]"
                      )}
                    >
                      <div
                        className={cn(
                          "text-body",
                          featuredColumn === 2 ? "font-medium text-snow" : "text-ash"
                        )}
                      >
                        {feature.column2}
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="text-body text-ash">{feature.column3}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CompareUILib;
