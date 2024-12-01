"use client";

import { BackButton } from "../_components/Navigation";

export default function VopPage() {
  return (
    <div className="flex flex-col h-full">
      <article className="flex flex-col h-full p-3 gap-4">
        {" "}
        <section id="obecna-ustanoveni">
          {" "}
          <h2 className="text-lg font-semibold">
            1. Obecná ustanovení a definice
          </h2>{" "}
          <p>
            {" "}
            <strong>1.1 Společnost</strong> znamená společnost registrovanou na
            adrese Radlická 3185/1c, Smíchov, 150 00, Praha 5, IČ: 26435675,
            registrovanou u Městského soudu v Praze.{" "}
          </p>{" "}
          <p>
            {" "}
            <strong>1.2 Pobočky</strong>, kde společnost provozuje multiplex
            kina:{" "}
          </p>{" "}
          <ul className="list-disc ml-5">
            {" "}
            <li>Hradec Králové - Brněnská 23a, Hradec Králové</li>{" "}
            <li>Ostrava - Novinářská 6c, Ostrava</li>{" "}
            <li>České Budějovice Čtyři Dvory - Milady Horákové 1498</li>{" "}
            <li>Olomouc - Pražská ul. 255/41, Olomouc</li>{" "}
            <li>Plzeň - Písecká 972/1, Plzeň</li>{" "}
            <li>Pardubice - Nám. Republiky 1400, Pardubice</li>{" "}
            <li>
              Mladá Boleslav - třída Václava Klementa 1459, Mladá Boleslav
            </li>{" "}
            <li>Jihlava - Hradební 1/5440, Jihlava</li>{" "}
            <li>Liberec - České Mládeže 456, Liberec</li>{" "}
            <li>Anděl - Radlická 3179/1E, Praha 5 – Smíchov</li>{" "}
            <li>Černý Most - Chlumecká 765/6, Praha 9</li>{" "}
            <li>Opava - U Fortny 49/10, Opava</li>{" "}
            <li>České Budějovice IGY Centrum - Pražská tř. 1247/24</li>{" "}
          </ul>{" "}
          <p>
            {" "}
            <strong>1.3 Zákazník</strong> je jakákoli osoba, která si zakoupí
            vstupenku na film nebo jiné představení přímo na pobočce, online
            nebo přes mobilní aplikaci.{" "}
          </p>{" "}
          <p>
            {" "}
            <strong>1.4 Standardní vstupenka</strong> je vstupenka zakoupená po
            zaplacení na pokladně multiplexu.{" "}
          </p>{" "}
          <p>
            {" "}
            <strong>1.5 E-vstupenka</strong> je vstupenka opatřená čárovým
            kódem, která je po online nákupu a zaplacení doručena jako PDF nebo
            SMS.{" "}
          </p>{" "}
        </section>{" "}
        <section id="nákup-vstupenek">
          {" "}
          <h2 className="text-lg font-semibold">2. Nákup vstupenek</h2>{" "}
          <p>
            {" "}
            <strong>2.1</strong> Zákazníci mohou zakoupit vstupenky na pobočkách
            multiplexů po předchozí online rezervaci nebo přímo, přičemž jsou
            přijímány platby v hotovosti a těmito kartami: MasterCard, Visa,
            American Express a Diners Club. K platbě lze využít i některé
            vouchery nebo benefitní systémy. Pro aktuální seznam přijímaných
            benefitních systémů navštivte webové stránky.{" "}
          </p>{" "}
          <p>
            {" "}
            <strong>2.2</strong> Vstupenky lze také zakoupit online s použitím
            stejných platebních metod a benefitních systémů uvedených výše.{" "}
          </p>{" "}
        </section>{" "}
        <section id="online-nákup">
          {" "}
          <h2 className="text-lg font-semibold">
            3. Online nákup vstupenek a platba (E-vstupenka)
          </h2>{" "}
          <p>
            {" "}
            <strong>3.1</strong> E-vstupenky lze zakoupit až do 30 minut před
            představením. Poté je třeba vstupenky zakoupit přímo na pokladně.{" "}
          </p>{" "}
          <p>
            {" "}
            <strong>3.2</strong> Při online nákupu e-vstupenek nelze využít
            kupony nebo volné vstupenky, pokud to na voucheru není uvedeno
            jinak.{" "}
          </p>{" "}
          <p>
            {" "}
            <strong>3.3</strong> Zákazníci mohou zakoupit více vstupenek na
            různá představení v jedné transakci, maximálně však šest vstupenek
            na jedno představení.{" "}
          </p>{" "}
          <p>
            {" "}
            <strong>3.4</strong> Po dokončení objednávky zákazník uvidí celkovou
            cenu vstupenek včetně DPH. Tato cena je konečná a zahrnuje případné
            slevy.{" "}
          </p>{" "}
          <p>
            {" "}
            <strong>3.5</strong> Po dokončení objednávky je zákazník přesměrován
            na zabezpečenou platební bránu.{" "}
          </p>{" "}
          <p>
            {" "}
            <strong>3.6</strong> Po úspěšné platbě obdrží zákazník potvrzovací
            e-mail s podrobnostmi o vstupenkách.{" "}
          </p>{" "}
        </section>{" "}
        <section id="rezervace-vstupenek">
          {" "}
          <h2 className="text-lg font-semibold">
            4. Internetová rezervace vstupenek
          </h2>{" "}
          <p>
            {" "}
            <strong>4.1</strong> Zákazníci mohou rezervovat vstupenky online na
            vybraná představení prostřednictvím webových stránek nebo mobilní
            aplikace.{" "}
          </p>{" "}
          <p>
            {" "}
            <strong>4.2</strong> Zákazníci si volí čas představení, konkrétní
            místa a kategorii vstupenek s tím, že platba bude provedena na
            pokladně při vyzvednutí.{" "}
          </p>{" "}
          <p>
            {" "}
            <strong>4.3</strong> Po rezervaci obdrží zákazník unikátní
            rezervační číslo v potvrzovacím e-mailu. Toto číslo je třeba
            předložit na pokladně při vyzvednutí vstupenek.{" "}
          </p>{" "}
        </section>{" "}
        <section id="další-podmínky">
          {" "}
          <h2 className="text-lg font-semibold">5. Další podmínky</h2>{" "}
          <p>
            {" "}
            <strong>5.1</strong> Zákazníci musí při vstupu předložit platnou
            standardní vstupenku nebo e-vstupenku s čárovým kódem, který bude
            naskenován pro ověření.{" "}
          </p>{" "}
          <p>
            {" "}
            <strong>5.2</strong> Zákazníci mají povinnost sedět na svých
            určených místech a po celou dobu návštěvy mít u sebe vstupenky.{" "}
          </p>{" "}
          <p>
            {" "}
            <strong>5.3</strong> Zakoupením vstupenek zákazníci souhlasí s
            dodržováním návštěvního řádu uvedeného v multiplexu.{" "}
          </p>{" "}
        </section>{" "}
        <section id="dárkové-vouchery">
          {" "}
          <h2 className="text-lg font-semibold">
            6. Nákup dárkových voucherů
          </h2>{" "}
          <p>
            {" "}
            <strong>6.1</strong> Dárkové vouchery jsou dostupné pouze k
            zakoupení na pobočkách multiplexů a lze je zaplatit hotově nebo
            stejnými kartami jako výše.{" "}
          </p>{" "}
          <p>
            {" "}
            <strong>6.2</strong> Dárkové vouchery nelze směnit za hotovost a
            jsou nevratné v souladu se zákonem o ochraně spotřebitele.{" "}
          </p>{" "}
        </section>{" "}
        <section id="zpracování-osobních-údajů">
          {" "}
          <h2 className="text-lg font-semibold">
            7. Zpracování osobních údajů
          </h2>{" "}
          <p> Informace o zpracování osobních údajů naleznete v . </p>{" "}
        </section>{" "}
        <section id="reklamace">
          {" "}
          <h2 className="text-lg font-semibold">8. Reklamační podmínky</h2>{" "}
          <p>
            {" "}
            <strong>8.1</strong> V případě, že došlo k nesprávnému stržení
            částky při nákupu vstupenek, zákazníci by se měli obrátit na svou
            banku nebo poskytovatele platby.{" "}
          </p>{" "}
          <p>
            {" "}
            <strong>8.2</strong> Pokud dojde ke zrušení představení, zákazník
            bude odškodněn dle následujícího:{" "}
          </p>{" "}
          <ul className="list-disc ml-5">
            {" "}
            <li>
              Pokud byla vstupenka zakoupena na pokladně, vrácení peněz proběhne
              okamžitě po návratu na stejné místo.
            </li>{" "}
            <li>
              Pokud byla vstupenka zakoupena online, zákazník obdrží peníze zpět
              stejnou platební metodou.
            </li>{" "}
          </ul>{" "}
        </section>{" "}
      </article>
      <div className="flex justify-center items-center gap-4 p-2 w-full border-t sticky bottom-0 bg-white">
        <BackButton href="./confirmation#vop" />
      </div>
    </div>
  );
}
