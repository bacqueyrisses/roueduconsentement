"use client";
import CancelButton from "@/components/buttons/cancel-button";
import DefinitionButton from "@/components/buttons/definition-button";
import {
  Dialog,
  DialogActions,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Highlight } from "@/lib/utils";
import { useState } from "react";

export default function DefinitionDialog() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DefinitionButton onClick={() => setIsOpen(true)} />
      <Dialog
        size={"5xl"}
        open={isOpen}
        onClose={setIsOpen}
        className={"space-y-4"}
      >
        <DialogTitle className={"mb-8 text-center md:mb-6 md:text-start"}>
          <Highlight className={"text-lg md:text-xl"}>
            Les 5 piliers du consentement
          </Highlight>
        </DialogTitle>
        <DialogDescription className={"space-y-1"}>
          <DialogTitle>Enthousiaste</DialogTitle>
          <div>
            Pour avoir un rapport sexuel consenti, il est essentiel que tu en
            aies une réelle envie de partager ce moment avec ton.ta.tes
            partenaire.s et que, tu l’exprimes avec enthousiasme, de manière
            verbale ou non, dans la mesure où cela ne laisse pas de place au
            doute pour le ou les autre.s. À l’inverse, tu dois pouvoir dire
            « non » sans craindre d’éventuelles conséquences (menaces, chantage
            affectif, etc.), sinon c’est une forme de pression, ce n’est pas
            consentir de façon authentique.
          </div>
        </DialogDescription>
        <DialogDescription className={"space-y-1"}>
          <DialogTitle>Libre et éclairé</DialogTitle>
          <div>
            <div>
              Une consommation excessive d'alcool ou de stupéfiants, le fait
              d’être inconscient.e ou endormi.e, ou toutes autres raisons qui
              pourraient altérer momentanément ta capacité de discernement
              peuvent t’empêcher de donner un consentement éclairé. Tu ne
              consens pas de manière éclairée non plus si ton.ta.tes
              partenaire.s ment.ent, dissimule.nt ou omet.tent délibérément
              certaines de leurs intentions pour que tu acceptes d’avoir un
              rapport sexuel avec elle.eux, tout comme tu ne donnes pas un
              consentement libre lorsque tu cèdes par crainte des répercussions
              en cas de refus de ta part.
            </div>
          </div>
        </DialogDescription>
        <DialogDescription className={"space-y-1"}>
          <DialogTitle>Spécifique</DialogTitle>
          <div>
            Peut-être que tu sais déjà ce dont tu as envie et ce dont tu n’as
            pas envie. Si ce n’est pas le cas, tu peux prendre un temps pour te
            poser la question et/ou en parler avec ton.ta.tes partenaire.s. Dans
            tous les cas, ce n’est pas parce que tu consens à une activité
            sexuelle que tu consens à toutes les autres. Par exemple, tu peux
            être ok pour avoir un rapport sexuel mais ne pas consentir à un
            rapport sexuel non protégé. Si ton.ta.tes partenaire.s retire.nt le
            préservatif pendant l’acte sans te le dire, c’est considéré comme un
            viol au regard de la loi.
          </div>
        </DialogDescription>
        <DialogDescription className={"space-y-1"}>
          <DialogTitle>Réversible</DialogTitle>
          <div>
            Si finalement si tu n’as plus envie de continuer, sache que c’est ok
            et qu’il est nécessaire de t’écouter. Tout partenaire doit accepter
            ton choix de ne pas aller plus loin car tu as le droit de changer
            d’avis à n’importe quel moment. authentique.
          </div>
        </DialogDescription>
        <DialogDescription className={"space-y-1"}>
          <DialogTitle>Informé</DialogTitle>
          <div>
            Pour ta santé, il est important de savoir si ce rapport sexuel
            présente un risque de grossesse non planifié ou d’infections
            sexuellement transmissibles. Pour éviter les mauvaises surprises, tu
            peux discuter des moyens de contraception et de protections contre
            les IST avec ton.ta.tes partenaire.s.
          </div>
        </DialogDescription>
        <DialogTitle className={"py-4 text-center md:py-0 md:text-start"}>
          ET N’OUBLIE PAS QUE <Highlight>SANS OUI C’EST NON</Highlight> !
        </DialogTitle>
        <DialogActions>
          <CancelButton onClick={() => setIsOpen(false)} variant={"close"} />
        </DialogActions>
      </Dialog>
    </>
  );
}
