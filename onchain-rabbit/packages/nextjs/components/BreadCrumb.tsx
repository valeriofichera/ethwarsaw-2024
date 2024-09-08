import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~~/components/ui/breadcrumb";

export const BreadCrumb = ({ pageKey }: { pageKey: string }) => {
  const handleCardClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  return (
    <Breadcrumb className="disabled" onClick={handleCardClick}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <BreadcrumbPage className={pageKey === "select" ? "text-white" : "text-white/20"}>select</BreadcrumbPage>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>
            <BreadcrumbPage className={pageKey === "sign" ? "text-white" : "text-white/20"}>sign</BreadcrumbPage>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className={pageKey === "success" ? "text-white" : "text-white/20"}>success!</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
