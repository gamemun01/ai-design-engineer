// BEFORE: Generic AI-generated checkout — "first draft" version
// Issues: magic values, div onClick, only Ideal+Loading, no a11y, double-submit risk

export default function CheckoutPage() {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0); // recomputed every render
  return (
    <div className="min-h-screen bg-white">
      {/* Summary — arbitrary colors, no aria-live */}
      <aside className="p-[17px] bg-[#f8fafc] rounded-[9px]">
        <h2 className="text-[15px] font-bold text-[#0f172a]">Order summary</h2>
        <ul>
          {items.map((i: any) => ( // any type
            <li key={i.id} className="text-[#475569]">{i.name} × {i.qty} — ${i.price * i.qty}</li>
          ))}
        </ul>
        <p className="text-[#0f172a]">Total: ${total}</p>
      </aside>

      {/* Payment form — no fieldset, no labels association */}
      <section className="p-[17px]">
        <h1 className="text-[19px]">Payment</h1>
        <input placeholder="Card number" className="border p-2" />
        <input placeholder="Expiry" className="border p-2" />
      </section>

      {/* CTA — div onClick, magic hex, below 44px touch target, no disabled, no focus */}
      <div
        className="bg-[#0d9488] text-white w-[320px] h-[42px] rounded-[9px] text-[15px]"
        onClick={() => {
          console.log("submit"); // console.log left in
          submit();
        }}
      >
        Place Order — ${total}
      </div>
    </div>
  );
}

// NOTE: only Ideal state exists. No Loading skeleton, no Empty state, no Error
// (declined card) panel, no Partial (coupon) state. If the card is declined the
// user sees nothing. If the cart is empty the form still renders.
