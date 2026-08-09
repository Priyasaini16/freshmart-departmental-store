function ProductSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
      {/* Image */}
      <div className="aspect-[4/3] bg-neutral-200"></div>

      {/* Content */}
      <div className="space-y-4 p-5">
        {/* Rating */}
        <div className="h-3 w-20 rounded bg-neutral-200"></div>

        {/* Product Name */}
        <div className="h-5 w-3/4 rounded bg-neutral-200"></div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-neutral-200"></div>
          <div className="h-3 w-5/6 rounded bg-neutral-200"></div>
        </div>

        {/* Delivery Badge */}
        <div className="h-6 w-28 rounded-full bg-neutral-200"></div>

        {/* Price + Button */}
        <div className="flex items-center justify-between pt-4">
          <div className="space-y-2">
            <div className="h-6 w-20 rounded bg-neutral-200"></div>
            <div className="h-3 w-12 rounded bg-neutral-200"></div>
          </div>

          <div className="h-10 w-24 rounded-xl bg-neutral-200"></div>
        </div>
      </div>
    </div>
  );
}

export default ProductSkeleton;